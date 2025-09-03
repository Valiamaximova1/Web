// src/pages/RegisterPage.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/context";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LangSwitch from "../components/LangSwitch";

export default function RegisterPage() {
  const { t, i18n } = useTranslation();
  const { register } = useAuth();
  const nav = useNavigate();

  // required
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [accept, setAccept] = useState(false);

  // optional profile
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");               // YYYY-MM-DD
  const [country, setCountry] = useState("BG");     // default
  const [lang, setLang] = useState(i18n.resolvedLanguage || "bg");
  const [currency, setCurrency] = useState("BGN");
  const [newsletter, setNewsletter] = useState(true);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const last = localStorage.getItem("lastLoginEmail");
    if (last) setEmail(last);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!email.includes("@")) { setErr(t("register.errorEmail")); return; }
    if (pwd.length < 8) { setErr(t("register.errorWeak")); return; }
    if (pwd !== pwd2) { setErr(t("register.errorMismatch")); return; }
    if (!accept) { setErr(t("register.errorTerms")); return; }

    setLoading(true);
    const ok = await register({
      email: email.trim(),
      password: pwd,
      firstName,
      lastName,
      phone,
      countryCode: country,
      langCode: lang,
      currency,
      newsletter,
      termsVersion: "v1.0",
      acceptTerms: true,
      dateOfBirth: dob || undefined
    });
    setLoading(false);

    if (ok) {
      localStorage.setItem("lastLoginEmail", email.trim());
      nav("/flights");
    } else {
      setErr(t("register.errorExists"));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 flex">
      {/* Left hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-10">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md" />
            <span className="text-2xl font-semibold text-gray-800">AirNova</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {t("register.title")}
          </h1>
          <p className="mt-3 text-gray-600">{t("register.subtitle")}</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-gray-900">{t("register.header")}</h2>
            <p className="mt-1 text-sm text-gray-600">{t("register.welcome")}</p>

            <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email + Passwords */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t("register.email")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t("register.password")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  type="password"
                  autoComplete="new-password"
                  value={pwd}
                  onChange={e=>setPwd(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">{t("register.hint")}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">{t("register.confirm")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  type="password"
                  autoComplete="new-password"
                  value={pwd2}
                  onChange={e=>setPwd2(e.target.value)}
                  required
                />
              </div>

              {/* Profile (optional) */}
              <div>
                <label className="block text-sm font-medium">{t("profile.firstName")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  value={firstName}
                  onChange={e=>setFirst(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.lastName")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  value={lastName}
                  onChange={e=>setLast(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.phone")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  placeholder="+359888123456"
                  value={phone}
                  onChange={e=>setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.dob")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  type="date"
                  value={dob}
                  onChange={e=>setDob(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.country")}</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  maxLength={2}
                  value={country}
                  onChange={e=>setCountry(e.target.value.toUpperCase())}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.language")}</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  value={lang}
                  onChange={e=>setLang(e.target.value)}
                >
                  <option value="bg">BG</option>
                  <option value="en">EN</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">{t("profile.currency")}</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"
                  value={currency}
                  onChange={e=>setCurrency(e.target.value)}
                >
                  <option value="BGN">BGN</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>

              {/* Consents */}
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={e=>setNewsletter(e.target.checked)}
                  />
                  {t("consents.newsletter")}
                </label>

                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    required
                    checked={accept}
                    onChange={e=>setAccept(e.target.checked)}
                  />
                  <span>
                    {t("consents.terms1")}{" "}
                    <a href="/terms" className="text-indigo-600 underline">
                      {t("consents.terms2")}
                    </a>{" "}
                    {t("consents.terms3")}
                  </span>
                </label>
              </div>

              {err && (
                <div className="sm:col-span-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {err}
                </div>
              )}

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2.5 text-white font-medium shadow-sm hover:shadow-md transition disabled:opacity-60"
                >
                  {loading ? t("register.loading") : t("register.submit")}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              {t("register.hasAccount")}{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
                {t("register.signIn")}
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <LangSwitch />
          </div>
        </div>
      </div>
    </div>
  );
}
