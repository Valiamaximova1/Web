import { useState } from "react";
import DateRangePicker from "./DateRange";
import type { DateRange } from "react-day-picker";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const [trip, setTrip] = useState<"oneway" | "round">("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [dates, setDates] = useState<DateRange | undefined>();
  const [pax, setPax] = useState(1);
  const { t } = useTranslation();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ trip, from, to, dates, pax });
    alert("Search submitted! (виж конзолата)");
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur shadow-xl px-4 py-4"
    >
      {/* сегментиран контрол */}
      <div className="mb-4 inline-flex rounded-xl border border-slate-200 p-1">
        <button
          type="button"
          onClick={() => setTrip("oneway")}
          className={`px-3 h-9 rounded-lg text-sm ${
            trip === "oneway" ? "bg-white shadow font-medium" : "text-slate-600"
          }`}
        >
          {t("search.oneway")}
        </button>
        <button
          type="button"
          onClick={() => setTrip("round")}
          className={`px-3 h-9 rounded-lg text-sm ${
            trip === "round" ? "bg-white shadow font-medium" : "text-slate-600"
          }`}
        >
          {t("search.round")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">
            {t("search.from")}
          </label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value.toUpperCase())}
            placeholder="SOF"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 h-11"
          />
        </div>

        <div className="hidden sm:flex items-end justify-center text-slate-400">
          ⇄
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">
            {t("search.to")}
          </label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            placeholder="LHR"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 h-11"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs text-slate-500 mb-1">
            {t("search.dates")}
          </label>
          <DateRangePicker value={dates} onChange={setDates} />
          {trip === "oneway" && (
            <p className="mt-1 text-xs text-slate-500">
              {t("search.hintOneway")}
            </p>
          )}
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">
            {t("search.passengers")}
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPax((p) => Math.max(1, p - 1))}
              className="rounded-lg border border-slate-300 w-10 h-11"
            >
              –
            </button>
            <input
              value={pax}
              onChange={(e) => setPax(Math.max(1, Number(e.target.value) || 1))}
              className="w-full text-center rounded-xl border border-slate-300 bg-white px-2 h-11"
            />
            <button
              type="button"
              onClick={() => setPax((p) => p + 1)}
              className="rounded-lg border border-slate-300 w-10 h-11"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="rounded-xl bg-indigo-600 text-white px-5 h-11 font-medium"
        >
          {t("search.searchBtn")}
        </button>
      </div>
    </form>
  );
}
