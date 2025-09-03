import { createContext, useContext } from "react";

export type User = { id: string; email: string; role: string } | null;

export type RegisterPayload = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  countryCode?: string;   // ISO2, напр. BG
  langCode?: string;      // 'bg' | 'en'
  currency?: string;      // 'BGN' | 'EUR'
  newsletter?: boolean;
  termsVersion?: string;  // напр. "v1.0"
  acceptTerms?: boolean;  // true
  dateOfBirth?: string;   // YYYY-MM-DD
};

export type AuthCtx = {
  user: User;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (payload: RegisterPayload) => Promise<boolean>;
};

export const Ctx = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
