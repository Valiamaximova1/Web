import { useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DateRangePicker({
  value,
  onChange,
}: {
  value?: DateRange;
  onChange: (v?: DateRange) => void;
}) {
  // локален state само за показване/скриване, стойността идва отвън
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-slate-300 bg-white px-3 h-11 text-left text-sm"
      >
        {value?.from ? value.from.toLocaleDateString() : "Depart date"}{" "}
        {" – "}
        {value?.to ? value.to.toLocaleDateString() : "Return date"}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl p-2">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={(r) => onChange(r)}
            numberOfMonths={2}
            defaultMonth={value?.from}
            className="text-sm"
            styles={{
              caption: { fontWeight: 600 },
              day_selected: { backgroundColor: "#4f46e5", color: "white" },
              day_range_middle: { backgroundColor: "rgba(79,70,229,0.12)" },
            }}
          />
          <div className="flex justify-end gap-2 px-2 pb-2">
            <button
              onClick={() => onChange(undefined)}
              className="rounded-lg border border-slate-300 px-3 h-9 text-sm"
            >
              Clear
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg bg-indigo-600 text-white px-3 h-9 text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
