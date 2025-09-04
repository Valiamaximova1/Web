import type { FlightOffer } from "../types/flights";
import { useNavigate } from "react-router-dom";

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function fmtDur(mins: number) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return `${h}h ${m}m`;
}
function sumDuration(segments: FlightOffer["segments"]) {
  return segments.reduce((a, s) => a + s.durationMinutes, 0);
}

export default function FlightCard({ offer }: { offer: FlightOffer }) {
  const nav = useNavigate();
  const out = offer.segments.slice(0, Math.ceil(offer.segments.length / 2));
  const ret = offer.segments.slice(Math.ceil(offer.segments.length / 2));

  return (
    <div className="rounded-2xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col gap-4">
      {/* OUTBOUND */}
      <LegRow segments={out} />

      {/* RETURN (if any) */}
      {ret.length > 0 && (
        <>
          <div className="h-px bg-slate-100 mx-1" />
          <LegRow segments={ret} />
        </>
      )}

      <div className="flex items-end justify-between">
        <div className="text-xs text-slate-500">
          {offer.refundable ? "Refundable • " : ""}
          {offer.baggage?.carryOn ? `Carry-on: ${offer.baggage.carryOn} • ` : ""}
          {offer.baggage?.checked ? `Checked: ${offer.baggage.checked}` : ""}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xl font-semibold text-slate-900">
              {offer.price.toLocaleString(undefined, { style: "currency", currency: offer.currency })}
            </div>
            <div className="text-xs text-slate-500">{offer.provider || "AirNova"}</div>
          </div>
          <button
            onClick={() => nav(`/flight/${encodeURIComponent(offer.id)}`)}
            className="rounded-xl bg-indigo-600 text-white px-4 h-10 text-sm hover:bg-indigo-700"
          >
            Детайли
          </button>
        </div>
      </div>
    </div>
  );
}

function LegRow({ segments }: { segments: FlightOffer["segments"] }) {
  const first = segments[0];
  const last = segments[segments.length - 1];
  const totalDur = sumDuration(segments);
  const stops = segments.length - 1;

  return (
    <div className="flex items-center gap-4">
      {/* carrier badge */}
      <div className="w-12 h-12 rounded-xl bg-slate-100 grid place-items-center text-slate-700 font-medium">
        {first.carrier}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-slate-900">
            {first.from} <span className="text-slate-300">→</span> {last.to}
          </div>
          <div className="text-sm text-slate-700">
            {fmtTime(first.depart)} – {fmtTime(last.arrive)}
          </div>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <span>{fmtDur(totalDur)}</span>
          <span>•</span>
          <span>{stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`}</span>
          <span>•</span>
          <span className="hidden sm:inline">{segments.map(s => `${s.carrier}${s.flightNumber}`).join(" · ")}</span>
        </div>
      </div>
    </div>
  );
}
