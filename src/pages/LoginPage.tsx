import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/context"; // <- важно

export default function LoginPage() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const ok = await login(email.trim(), password);
    setLoading(false);
    if (ok) {
      // ако искаш, пази имейла при remember
      if (remember) localStorage.setItem("lastLoginEmail", email.trim());
      nav("/flights");
    } else {
      setErr(t("login.errorInvalid"));
    }
  }

  React.useEffect(() => {
    const last = localStorage.getItem("lastLoginEmail");
    if (last) setEmail(last);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex">
      {/* Left hero (desktop) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md" />
            <span className="text-2xl font-semibold text-gray-800">AirNova</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t("login.title")}
          </h1>
          <p className="mt-3 text-gray-600">
            {t("login.subtitle")}
          </p>
          <div className="mt-8 rounded-2xl bg-white/60 backdrop-blur p-6 shadow-sm border border-gray-100">
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• JWT + Refresh (HttpOnly)</li>
              <li>• Gateway на <code>18080</code></li>
              <li>• Защитени API /auto-refresh/</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 lg:hidden">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow" />
            <h1 className="mt-4 text-2xl font-semibold text-gray-900">AirNova</h1>
          </div>

          <div className="rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">{t("login.signIn")}</h2>
            <p className="mt-1 text-sm text-gray-600">{t("login.welcomeBack")}</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("login.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="you@airnova.dev"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("login.password")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    aria-label={showPwd ? t("login.hide") : t("login.show")}
                    className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500 hover:text-gray-700"
                  >
                    {/* eye icon */}
                    {showPwd ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M3 3l18 18M10.58 10.59a2 2 0 102.83 2.82" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9.88 5.09A10.34 10.34 0 0121 12c-1.53 2.7-4.8 6-9 6-1.2 0-2.33-.25-3.37-.7M6.5 6.5A10.33 10.33 0 003 12c1.15 2.04 3.2 4.2 6 5.3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  {t("login.remember")}
                </label>
                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  {t("login.forgot")}
                </button>
              </div>

              {/* Error */}
              {err && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {err}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-white font-medium shadow-sm hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? t("login.loading") : t("login.submit")}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-gray-600">
              {t("login.noAccount")}{" "}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
                {t("login.signUp")}
              </Link>
            </p>
          </div>

          {/* Language switch (optional) */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <LangSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}

function LangSwitch() {
  const { i18n } = useTranslation();
  const langs = [
    { code: "bg", label: "BG" },
    { code: "en", label: "EN" },
  ];
  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white/70 backdrop-blur">
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => i18n.changeLanguage(l.code)}
          className={`px-3 py-1 text-sm ${i18n.language.startsWith(l.code) ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
