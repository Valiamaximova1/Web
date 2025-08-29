import { useTranslation } from "react-i18next";

export default function LangSwitch() {
  const { i18n } = useTranslation();

  const setLang = (lng: "bg" | "en") => i18n.changeLanguage(lng);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setLang("bg")}
        className={`h-8 px-2 rounded-lg text-sm ${i18n.language.startsWith("bg") ? "bg-slate-200" : "bg-white border border-slate-200"}`}
      >
        BG
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`h-8 px-2 rounded-lg text-sm ${i18n.language.startsWith("en") ? "bg-slate-200" : "bg-white border border-slate-200"}`}
      >
        EN
      </button>
    </div>
  );
}
