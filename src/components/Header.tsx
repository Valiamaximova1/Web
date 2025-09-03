import { useTranslation } from "react-i18next";
import LangSwitch from "./LangSwitch";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="font-semibold text-indigo-600">{t("brand")}</div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
          <a href="#">{t("nav.flights")}</a>
          <a href="#">{t("nav.deals")}</a>
          <a href="#">{t("nav.support")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch />
          <button
            onClick={() => navigate("/login")}
            className="rounded-xl bg-indigo-600 text-white px-4 h-9 text-sm"
          >
            {t("nav.signin")}
          </button>
        </div>
      </div>
    </header>
  );
}
