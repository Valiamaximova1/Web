import { useState } from "react";

type Traveler = { id: string; first: string; last: string; dob?: string; doc?: string };

export default function TravelersPage() {
  const [items, setItems] = useState<Traveler[]>([
    { id: "t1", first: "Ivan", last: "Petrov", dob: "1990-04-12", doc: "E1234567" },
  ]);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Traveler>({ id: "", first: "", last: "" });

  function add() {
    if (!draft.first || !draft.last) return;
    setItems([...items, { ...draft, id: Math.random().toString(36).slice(2,8) }]);
    setOpen(false); setDraft({ id: "", first: "", last: "" });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Запазени пътници</h2>
        <button onClick={() => setOpen(true)} className="rounded-xl bg-indigo-600 text-white px-4 h-10 hover:bg-indigo-700">Добави</button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Име</th><th className="py-2">Фамилия</th><th className="py-2">Рожд. дата</th><th className="py-2">Документ</th>
            </tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t.id} className="border-t">
                <td className="py-2">{t.first}</td>
                <td className="py-2">{t.last}</td>
                <td className="py-2">{t.dob || "—"}</td>
                <td className="py-2">{t.doc || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-20 bg-black/30 grid place-items-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <div className="text-lg font-semibold mb-3">Нов пътник</div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="Име" className="rounded-xl border px-3 h-11"
                     value={draft.first} onChange={e=>setDraft({...draft, first: e.target.value})}/>
              <input placeholder="Фамилия" className="rounded-xl border px-3 h-11"
                     value={draft.last} onChange={e=>setDraft({...draft, last: e.target.value})}/>
              <input type="date" placeholder="Рожд. дата" className="rounded-xl border px-3 h-11"
                     value={draft.dob || ""} onChange={e=>setDraft({...draft, dob: e.target.value})}/>
              <input placeholder="Документ" className="rounded-xl border px-3 h-11"
                     value={draft.doc || ""} onChange={e=>setDraft({...draft, doc: e.target.value})}/>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={()=>setOpen(false)} className="rounded-xl border px-4 h-10">Отказ</button>
              <button onClick={add} className="rounded-xl bg-indigo-600 text-white px-4 h-10">Запази</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
