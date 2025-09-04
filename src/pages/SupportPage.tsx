export default function SupportPage() {
  const faqs = [
    { q: "Как да променя датите си?", a: "От „Моите резервации“ изберете резервация → Промени. Някои тарифи имат такса." },
    { q: "Къде е билетът ми?", a: "След плащане изпращаме e-ticket на имейла. Може да го свалиш и от „Моите резервации“." },
    { q: "Как работи багажът?", a: "Повечето оферти включват ръчен. Чекираният багаж се добавя на стъпка Плащане." },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">Поддръжка</h1>
      <p className="text-slate-600 mt-1">Често задавани въпроси и контакт.</p>

      <div className="mt-6 space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="group rounded-xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <span className="font-medium text-slate-900">{f.q}</span>
              <span className="text-slate-500 text-sm group-open:hidden">Покажи</span>
              <span className="text-slate-500 text-sm hidden group-open:inline">Скрий</span>
            </summary>
            <p className="mt-2 text-slate-700 text-sm">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
        <div className="font-semibold text-slate-900">Нуждаеш се от помощ?</div>
        <p className="text-sm text-slate-700 mt-1">
          Пиши ни на <a className="underline" href="mailto:support@airnova.dev">support@airnova.dev</a>
          {" "}или на чат в долния десен ъгъл.
        </p>
      </div>
    </div>
  );
}
