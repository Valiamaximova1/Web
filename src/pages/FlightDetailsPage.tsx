import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchJson } from "../lib/api";
import type { FlightOffer } from "../types/flights";

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}
function mins(m: number) { const h = Math.floor(m/60); const mm = m%60; return `${h}h ${mm}m`; }

export default function FlightDetailsPage() {
  const { id } = useParams();
  const [offer, setOffer] = useState<FlightOffer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchJson<FlightOffer>(`/api/v1/flights/${encodeURIComponent(id!)}`);
        if (!cancelled) setOffer(data);
      } catch {
        // simple mock: derive from id
        if (!cancelled) setOffer(null);
      } finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="mx-auto max-w-4xl px-4 py-8">Зареждане…</div>;

  if (!offer) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <p className="text-slate-700">Не успяхме да заредим детайла за полет <span className="font-mono">{id}</span>.</p>
          <Link to="/search" className="text-indigo-600 underline text-sm">Назад към търсене</Link>
        </div>
      </div>
    );
  }

  const out = offer.segments.slice(0, Math.ceil(offer.segments.length/2));
  const ret = offer.segments.slice(Math.ceil(offer.segments.length/2));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Детайли за оферта</h2>
        <div className="text-xl font-semibold">
          {offer.price.toLocaleString(undefined, { style: "currency", currency: offer.currency })}
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-6">
        <LegTimeline title="Излитане" segments={out} />
        {ret.length > 0 && <LegTimeline title="Връщане" segments={ret} />}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <InfoCard title="Багаж">
          <ul className="text-sm text-slate-700 space-y-1">
            <li>Ръчен: {offer.baggage?.carryOn || "—"}</li>
            <li>Чекиран: {offer.baggage?.checked || "—"}</li>
          </ul>
        </InfoCard>
        <InfoCard title="Условия">
          <p className="text-sm text-slate-700">{offer.refundable ? "Рефундируем" : "Нерефундируем"}</p>
        </InfoCard>
        <InfoCard title="Доставчик">
          <p className="text-sm text-slate-700">{offer.provider || "AirNova"}</p>
        </InfoCard>
      </div>

      <div className="flex gap-3">
        <Link to={`/book/${encodeURIComponent(offer.id)}/passengers`} className="rounded-xl bg-indigo-600 text-white px-5 h-11 grid place-items-center hover:bg-indigo-700">
          Продължи към резервация
        </Link>
        <Link to="/search" className="rounded-xl bg-white border border-slate-300 px-5 h-11 grid place-items-center text-slate-700 hover:bg-slate-50">
          Назад към резултатите
        </Link>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4">
      <div className="text-sm font-semibold text-slate-900 mb-1">{title}</div>
      {children}
    </div>
  );
}

function LegTimeline({ title, segments }: { title: string; segments: FlightOffer["segments"] }) {
  const total = segments.reduce((a, s) => a + s.durationMinutes, 0);
  return (
    <div>
      <div className="text-sm font-semibold text-slate-900 mb-3">
        {title} • Общо време: {mins(total)}
      </div>
      <ol className="relative border-s-2 border-slate-100 ps-4 space-y-4">
        {segments.map((s, idx) => (
          <li key={idx}>
            <div className="absolute -start-1.5 mt-1 h-3 w-3 rounded-full bg-indigo-600" />
            <div className="flex flex-wrap items-center gap-x-3">
              <span className="text-slate-900 font-medium">{s.from} → {s.to}</span>
              <span className="text-slate-500 text-sm">{s.carrier}{s.flightNumber}</span>
            </div>
            <div className="text-sm text-slate-700">
              {fmt(s.depart)} → {fmt(s.arrive)} • {mins(s.durationMinutes)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
