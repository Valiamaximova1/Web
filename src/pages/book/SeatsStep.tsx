import { useState } from "react";

const rows = 8, cols = 6; // A-F

export default function SeatsStep() {
  const [sel, setSel] = useState<string[]>([]);

  function toggle(seat: string) {
    setSel(s => s.includes(seat) ? s.filter(x => x !== seat) : [...s, seat]);
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-600">Избери места (примерна визуализация)</div>
      <div className="inline-block rounded-2xl border border-slate-200 p-4 bg-slate-50">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 2.25rem)` }}>
          {Array.from({ length: rows }).map((_, r) => (
            Array.from({ length: cols }).map((_, c) => {
              const seat = `${r+1}${String.fromCharCode(65+c)}`;
              const active = sel.includes(seat);
              return (
                <button
                  key={seat}
                  onClick={() => toggle(seat)}
                  className={`w-9 h-9 rounded-md text-xs font-medium
                    ${active ? "bg-indigo-600 text-white" : "bg-white border border-slate-300 hover:bg-slate-100"}`}
                  title={`Seat ${seat}`}
                >
                  {seat}
                </button>
              );
            })
          ))}
        </div>
      </div>

      <div className="text-sm text-slate-700">Избрани: {sel.length > 0 ? sel.join(", ") : "—"}</div>

      <button type="button" className="rounded-xl bg-indigo-600 text-white px-5 h-11">
        Продължи към плащане
      </button>
    </div>
  );
}
