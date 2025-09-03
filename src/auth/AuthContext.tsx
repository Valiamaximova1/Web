import React, { useState } from "react";
import { Ctx, type User, type AuthCtx } from "./context";

const API_BASE = (import.meta.env.VITE_API_BASE as string) ?? "http://localhost:18080";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login: AuthCtx["login"] = async (email, password) => {
    const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) return false;
    const data = await res.json(); // { accessToken, userId, email, role }
    setAccessToken(data.accessToken);
    setUser({ id: data.userId, email: data.email, role: data.role });
    return true;
  };

  const logout: AuthCtx["logout"] = async () => {
    await fetch(`${API_BASE}/api/v1/auth/logout`, { method: "POST", credentials: "include" });
    setUser(null);
    setAccessToken(null);
  };

  return <Ctx.Provider value={{ user, accessToken, login, logout }}>{children}</Ctx.Provider>;
};

export default AuthProvider;
