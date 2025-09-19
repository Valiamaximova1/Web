import { tokenStore } from "./tokenStore";

const GATEWAY = import.meta.env.VITE_API_BASE || "";
const ID_BASE  = import.meta.env.VITE_IDENTITY_BASE || GATEWAY;
const FO_BASE  = import.meta.env.VITE_FLIGHT_OPS_BASE || GATEWAY;

let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccess(): Promise<string | null> {
  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const res = await fetch(ID_BASE + "/api/v1/auth/refresh", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) return null;
        const data = await res.json().catch(() => ({}));
        const token: string | undefined =
          data.accessToken || data.token || data.access || data.jwt;
        if (!token) return null;
        tokenStore.set(token);
        return token;
      } catch {
        return null;
      } finally {
        refreshInFlight = null;
      }
    })();
  }
  return refreshInFlight;
}

export async function fetchJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base =
    path.startsWith("/api/v1/auth")   ? ID_BASE :
    path.startsWith("/api/v1/flights") ? FO_BASE : GATEWAY;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string,string> | undefined),
  };

  const at = tokenStore.get();
  if (at && !headers["Authorization"]) headers["Authorization"] = `Bearer ${at}`;

  const doFetch = () => fetch(base + path, {
    credentials: "include",
    ...init,
    headers,
  });

  let res = await doFetch();

  // ако е 401 и имаме refresh cookie -> опитай refresh и retry 1 път
  if (res.status === 401) {
    const newTok = await refreshAccess();
    if (newTok) {
      headers["Authorization"] = `Bearer ${newTok}`;
      res = await doFetch();
    }
  }

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${txt}`.trim());
  }
  return res.json() as Promise<T>;
}
