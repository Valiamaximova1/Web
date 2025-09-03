import React, { useState } from "react";
import { Ctx, type User, type AuthCtx, type RegisterPayload } from "./context";

const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "http://localhost:18080";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const setFromResponse = async (res: Response) => {
    const data = await res.json(); // { accessToken, userId, email, role }
    setAccessToken(data.accessToken);
    setUser({ id: data.userId, email: data.email, role: data.role });
  };

  const login: AuthCtx["login"] = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return false;
    await setFromResponse(res);
    return true;
  };

  const register: AuthCtx["register"] = async (payload: RegisterPayload) => {
    // 1) опит с разширено тяло
    let res = await fetch(`${API_BASE}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload)
    });

    // 2) ако бекендът все още приема само минимално тяло → fallback
    if (!res.ok) {
      res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: payload.email, password: payload.password })
      });
      if (!res.ok) return false;
    }

    await setFromResponse(res);
    return true;
  };

  const logout: AuthCtx["logout"] = async () => {
    await fetch(`${API_BASE}/api/v1/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setAccessToken(null);
  };

  return (
    <Ctx.Provider value={{ user, accessToken, login, logout, register }}>
      {children}
    </Ctx.Provider>
  );
};

export default AuthProvider;
