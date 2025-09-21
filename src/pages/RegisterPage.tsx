/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/RegisterPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../auth/context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** helpers */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^\+?[1-9]\d{7,14}$/; // E.164
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[a-z]/.test(p)) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return Math.min(s, 4); // 0..4
}

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const { register } = useAuth();
  const nav = useNavigate();

  // Required
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [accept, setAccept] = useState(false);

  // Optional (right column)
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("BG");
  const [lang, setLang] = useState(i18n.resolvedLanguage || "bg");
  const [currency, setCurrency] = useState("BGN");
  const [newsletter, setNewsletter] = useState(true);

  const [loading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const last = localStorage.getItem("lastLoginEmail");
    if (last) setEmail(last);
  }, []);

  const pwdStrength = useMemo(() => strength(pwd), [pwd]);

  const minimalValid =
    emailRe.test(email) &&
    pwd.length >= 8 &&
    pwd === pwd2 &&
    accept;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!emailRe.test(email)) return setErr(t("register.errorEmail", "Invalid email."));
    if (pwd.length < 8) return setErr(t("register.errorWeak", "Password too weak."));
    if (pwd !== pwd2) return setErr(t("register.errorMismatch", "Passwords do not match."));
    if (!accept) return setErr(t("register.errorTerms", "You must accept the Terms."));

    // включваме опционалните само ако са попълнени / валидни
    const payload: any = {
      email: email.trim(),
      password: pwd,
      termsVersion: "v1.0",
      acceptTerms: true
    };
    if (firstName.trim()) payload.firstName = firstName.trim();
    if (lastName.trim()) payload.lastName = lastName.trim();
    if (phone.trim()) {
      if (!phoneRe.test(phone)) return setErr(t("profile.errorPhone", "Invalid phone format."));
      payload.phone = phone.trim();
    }
    if (dob) payload.dateOfBirth = dob;
    if (country) {
      const cc = country.toUpperCase();
      if (!/^[A-Z]{2}$/.test(cc)) return setErr(t("profile.errorCountry", "Country must be ISO2 (e.g., BG)."));
      payload.countryCode = cc;
    }
    if (lang) payload.langCode = lang;
    if (currency) payload.currency = currency;
    payload.newsletter = !!newsletter;

  console.log("[REG] payload", payload);
const ok = await register(payload);
console.log("[REG] register ->", ok);
if (ok) {
  const e = payload.email.trim().toLowerCase();
  console.log("[REG] navigating to /verify-email?email=", e);
  nav(`/verify-email?email=${encodeURIComponent(e)}`, { replace: true });
} else {
  setErr(t("register.errorExists", "Email already exists or the request failed."));
}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">    
      <main className="min-h-[calc(100vh-56px)]">
        {/* Page header row */}
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {t("register.pageTitle", "Регистрация")}
              </h1>
              <p className="text-sm text-gray-600">
                {t("register.welcome", "Въведи имейл и парола. Детайлите можеш да добавиш и по-късно.")}
              </p>
            </div>
          </div>
        </div>

        {/* Two-column content */}
        <div className="mx-auto max-w-6xl px-4 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Required form */}
          <section className="rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100 p-6 sm:p-8">
            {err && (
              <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
                {err}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("register.email", "Email")}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none shadow-sm placeholder-gray-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  placeholder="you@airnova.dev"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
                  {t("register.password", "Парола")}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="pwd"
                    type={showPwd ? "text" : "password"}
                    autoComplete="new-password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 outline-none shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute inset-y-0 right-2 grid place-items-center px-2 text-gray-500 hover:text-gray-700"
                    aria-label={showPwd ? t("login.hide", "Скрий") : t("login.show", "Покажи")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      {showPwd ? (
                        <>
                          <path d="M3 3l18 18M10.6 10.6a2 2 0 102.8 2.8" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M9.9 5.1A10.3 10.3 0 0121 12c-1.5 2.7-4.8 6-9 6-1.2 0-2.3-.2-3.4-.7M6.5 6.5A10.3 10.3 0 003 12c1.2 2 3.2 4.2 6 5.3" stroke="currentColor" strokeWidth="1.5" />
                        </>
                      ) : (
                        <>
                          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>

                {/* strength meter */}
                <div className="mt-2 flex gap-1.5" aria-hidden>
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-full rounded-full transition-all ${
                        pwd.length === 0 ? "bg-gray-200" : i < pwdStrength ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">{t("register.hint", "Минимум 8 символа.")}</p>
              </div>

              {/* Confirm */}
              <div>
                <label htmlFor="pwd2" className="block text-sm font-medium text-gray-700">
                  {t("register.confirm", "Потвърди паролата")}
                </label>
                <input
                  id="pwd2"
                  type="password"
                  autoComplete="new-password"
                  value={pwd2}
                  onChange={(e) => setPwd2(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="••••••••"
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm text-gray-800">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={accept}
                  onChange={(e) => setAccept(e.target.checked)}
                  required
                />
                <span>
                  {t("consents.terms1", "Създавайки акаунт, приемам")}{" "}
                  <a href="/terms" className="text-indigo-600 underline">
                    {t("consents.terms2", "Общите условия")}
                  </a>{" "}
                  {t("consents.terms3", "и Политиката за поверителност.")}
                </span>
              </label>

              {/* Submit + link */}
              <button
                type="submit"
                disabled={loading || !minimalValid}
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-white font-medium shadow-sm hover:shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? t("register.loading", "Създаване...") : t("register.submit", "Създай акаунт")}
              </button>

              <p className="text-center text-sm text-gray-600">
                {t("register.hasAccount", "Вече имаш акаунт?")}{" "}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
                  {t("register.signIn", "Вход")}
                </Link>
              </p>
            </form>
          </section>

          {/* RIGHT: Optional details */}
          <aside className="space-y-6">
            <section className="rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">
                {t("register.optional", "Допълнителни детайли (по избор)")}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {t("register.optionalHint", "Помагат при резервации и онлайн чек-ин.")}
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">{t("profile.firstName", "Име")}</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={firstName}
                    onChange={(e) => setFirst(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">{t("profile.lastName", "Фамилия")}</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={lastName}
                    onChange={(e) => setLast(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.phone", "Телефон")}</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    placeholder="+359888123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.dob", "Дата на раждане")}</label>
                  <input
                    type="date"
                    max={todayISO()}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.country", "Държава (ISO2)")}</label>
                  <input
                    maxLength={2}
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm uppercase tracking-widest focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={country}
                    onChange={(e) => setCountry(e.target.value.toUpperCase())}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.language", "Език")}</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  >
                    <option value="bg">BG</option>
                    <option value="en">EN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">{t("profile.currency", "Валута")}</label>
                  <select
                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none shadow-sm focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="BGN">BGN</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-gray-800 sm:col-span-2 mt-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                  />
                  {t("consents.newsletter", "Искам да получавам оферти и новини по имейл.")}
                </label>
              </div>
            </section>

            {/* Small benefits / trust card */}
            <section className="rounded-2xl bg-white/80 backdrop-blur shadow border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                {t("ui.whyRegister", "Защо да се регистрираш")}
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• {t("ui.benefits.security", "Защитени API & автоматично подновяване на сесията")}</li>
                <li>• {t("ui.benefits.faster", "По-бързи резервации и чек-ин")}</li>
                <li>• {t("ui.benefits.preferences", "Запазени предпочитания (език/валута)")}</li>
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
