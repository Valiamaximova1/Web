import { useTranslation } from "react-i18next";

export default function LangSwitch() {
  const { i18n } = useTranslation();
  // безопасен fallback, за да не чупи startsWith:
  const current = i18n?.resolvedLanguage || i18n?.language || "en";

  const langs = [
    { code: "bg", label: "BG" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-white/70 backdrop-blur">
      {langs.map((l) => {
        const active = current.startsWith(l.code);
        return (
          <button
            key={l.code}
            onClick={() => i18n.changeLanguage(l.code)}
            aria-pressed={active}
            disabled={active}
            className={`px-3 py-1 text-sm ${
              active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
