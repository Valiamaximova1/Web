import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LangSwitch from "./LangSwitch";
import { useAuth } from "../auth/context";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold text-indigo-600">AirNova</Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
          <Link to="/flights" className="hover:text-slate-900">{t("nav.flights")}</Link>
          <Link to="/deals" className="hover:text-slate-900">{t("nav.deals")}</Link>
          <Link to="/support" className="hover:text-slate-900">{t("nav.support")}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch />
          {user ? (
            <>
              <span className="text-sm text-slate-600">{user.email}</span>
              <button
                onClick={logout}
                className="rounded-xl bg-slate-900 text-white px-4 h-9 text-sm hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl bg-indigo-600 text-white px-4 h-9 text-sm hover:bg-indigo-700"
            >
              {t("nav.signin")}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
