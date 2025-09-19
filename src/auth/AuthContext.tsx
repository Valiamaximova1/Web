import React from "react";
import { Ctx } from "./context";
import type { AuthCtx, User, RegisterPayload } from "./context";
import { tokenStore } from "../lib/tokenStore";

const ID_BASE =
  import.meta.env.VITE_IDENTITY_BASE || import.meta.env.VITE_API_BASE || "";

/* ------------ WARN ако базовият URL е празен (честа причина) ------------- */
if (!ID_BASE) {
  // ще видиш това в конзолата, ако не е подаден URL към бекенда
  console.warn(
    "[Auth] VITE_IDENTITY_BASE/VITE_API_BASE липсва. Използва се празен ID_BASE."
  );
}

/* ----------------------------- HELPERS ----------------------------------- */

// Debug флаг – сложи на false, ако не искаш логове
const DEBUG_HTTP = true;

function debugLog(res: Response, raw: string) {
  if (!DEBUG_HTTP) return;
  const ct = res.headers.get("content-type");
  // показваме само първите 400 символа от body, за да не спамим
  const preview = raw.length > 400 ? raw.slice(0, 400) + " …" : raw;
  console.log(
    `[HTTP] ${res.url} -> ${res.status} ${res.statusText}\n` +
      `content-type: ${ct}\n` +
      `headers: ${Array.from(res.headers.entries())
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")}\n` +
      `body: ${preview}`
  );
}

function extractTokenFromAny(data: any): string | undefined {
  if (!data) return undefined;
  // плоски ключове
  const flat =
    data?.accessToken ?? data?.token ?? data?.access ?? data?.jwt ?? undefined;
  if (flat) return flat as string;
  // вложени под data / result / payload
  const nested =
    data?.data?.accessToken ??
    data?.data?.token ??
    data?.data?.jwt ??
    data?.result?.accessToken ??
    data?.payload?.accessToken ??
    undefined;
  return nested as string | undefined;
}

function extractTokenFromHeaders(res: Response): string | undefined {
  const auth =
    res.headers.get("authorization") || res.headers.get("Authorization");
  if (!auth) return undefined;
  const lower = auth.toLowerCase();
  if (lower.startsWith("bearer ")) return auth.slice(7).trim();
  return undefined;
}

function extractUser(data: any, fallbackEmail?: string): User {
  if (data?.user && typeof data.user === "object") {
    return data.user as User;
  }
  // вложени структури
  const inner = data?.data?.user ?? data?.result?.user ?? data?.payload?.user;
  if (inner && typeof inner === "object") return inner as User;

  const email = data?.email ?? data?.data?.email ?? fallbackEmail;
  const userId =
    data?.userId ?? data?.data?.userId ?? data?.id ?? data?.data?.id;
  const role = data?.role ?? data?.data?.role ?? "USER";

  if (email) {
    return { id: (userId as string) ?? "me", email: String(email), role: String(role) };
  }
  return null;
}

/** Безопасно парсване: не хвърля при 204/празно/HTML */
async function readJsonSafe(res: Response): Promise<any | null> {
  if (res.status === 204) {
    if (DEBUG_HTTP) debugLog(res, "");
    return null;
  }
  const text = await res.clone().text(); // четем копие за debug и parse
  if (DEBUG_HTTP) debugLog(res, text);

  const ct = res.headers.get("content-type") || "";
  if (!text.trim()) return null;

  // ако не е JSON, все пак опитай да parse-неш – някои бекенди връщат text/plain
  if (!ct.includes("application/json")) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/* ----------------------------- PROVIDER ---------------------------------- */

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>(null);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  const setBoth = (t: string | null | undefined, u: User) => {
    const norm = t ?? null;
    tokenStore.set(norm);
    setAccessToken(norm);
    setUser(u);
  };

  // авто login при reload чрез refresh cookie
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${ID_BASE}/api/v1/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await readJsonSafe(res); // няма да гърми
        // токен от body или от header
        const tok = extractTokenFromAny(data) ?? extractTokenFromHeaders(res);
        if (!tok) return;

        const u = extractUser(data);
        setBoth(tok, u);
      } catch {
        // тихо
      }
    })();
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    try {
      const res = await fetch(`${ID_BASE}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) return false;

      const data = await readJsonSafe(res);
      const tok = extractTokenFromAny(data) ?? extractTokenFromHeaders(res);
      const u =
        extractUser(data, email) ?? ({ id: "me", email, role: "USER" } as User);

      setBoth(tok ?? null, u);
      return true;
    } catch {
      return false;
    }
  };

  const register: AuthCtx["register"] = async (payload: RegisterPayload) => {
    try {
      const res = await fetch(`${ID_BASE}/api/v1/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return false;

      const data = await readJsonSafe(res);
      if (!data) return true; // успешно, без тяло

      const tok = extractTokenFromAny(data) ?? extractTokenFromHeaders(res);
      const u = extractUser(data);
      if (tok) setBoth(tok, u);
      return true;
    } catch {
      return false;
    }
  };

  const logout: AuthCtx["logout"] = async () => {
    try {
      const res = await fetch(`${ID_BASE}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      await readJsonSafe(res); // само за лог
    } catch {}
    setBoth(null, null);
  };

  const value: AuthCtx = { user, accessToken, login, logout, register };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
