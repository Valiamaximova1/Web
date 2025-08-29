import { useTranslation } from "react-i18next";
import LangSwitch from "./LangSwitch";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-dvh section-dark text-brand-ink">
      <header className="sticky top-0 z-50 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="font-display text-2xl font-extrabold tracking-tight">{t("brand")} ✈️</div>
          <nav className="hidden md:flex gap-6 text-sm text-brand-muted">
            <a href="#">{t("nav.flights")}</a>
            <a href="#">{t("nav.deals")}</a>
            <a href="#">{t("nav.support")}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="btn hidden md:inline-flex">{t("auth.signin")}</button>
            <LangSwitch/>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-brand-muted">
          © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}
