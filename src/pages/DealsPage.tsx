import { Link } from "react-router-dom";

const deals = [
  { id: "SOF-LON", from: "SOF", to: "LON", price: 39, cur: "EUR", badge: "Weekend" },
  { id: "SOF-PAR", from: "SOF", to: "PAR", price: 49, cur: "EUR", badge: "Spring" },
  { id: "SOF-FRA", from: "SOF", to: "FRA", price: 59, cur: "EUR", badge: "Direct" },
  { id: "SOF-ROM", from: "SOF", to: "ROM", price: 29, cur: "EUR", badge: "Hot" },
];

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900">Оферти</h1>
      <p className="text-slate-600 mt-1">Грабни ранните промо цени — ограничени места.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map(d => (
          <div key={d.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm">
            <div className="h-28 bg-gradient-to-tr from-indigo-100 to-sky-100 grid place-items-center">
              <div className="text-3xl font-bold text-slate-800">
                {d.from} <span className="text-slate-400">→</span> {d.to}
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-500">{d.badge}</div>
                <div className="text-lg font-semibold">
                  {d.price.toLocaleString(undefined, { style: "currency", currency: d.cur })}
                </div>
              </div>
              <Link
                to={`/search?from=${d.from}&to=${d.to}`}
                className="rounded-xl bg-indigo-600 text-white px-4 h-10 grid place-items-center hover:bg-indigo-700"
              >
                Търси
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
