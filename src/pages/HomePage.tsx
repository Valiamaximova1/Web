import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <section className="relative"> {/* махнато overflow-hidden */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-white pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 text-center">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-slate-600 text-center">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10">
            <SearchBar />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
