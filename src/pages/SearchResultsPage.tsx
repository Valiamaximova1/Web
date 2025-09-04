import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchJson } from "../lib/api";
import type { FlightOffer, FlightSegment } from "../types/flights";
import FlightsSkeleton from "../components/FlightsSkeleton";
import FlightsFilters from "../components/FlightsFilters";
import FlightCard from "../components/FlightCard";

type ApiSearchRes = { items: FlightOffer[] };

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const from = (params.get("from") || "").toUpperCase().slice(0, 3);
  const to = (params.get("to") || "").toUpperCase().slice(0, 3);
  const date = params.get("date") || "";

  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [error, setError] = useState<string | null>(null);

  // filters
  const [nonstop, setNonstop] = useState(false);
  const [sort, setSort] = useState<"price" | "duration" | "depart">("price");
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setLoading(true); setError(null);

    (async () => {
      try {
        // опитай истински бекенд
        const data = await fetchJson<ApiSearchRes>(`/api/v1/flights/search?from=${from}&to=${to}&date=${date}`);
        if (!cancelled) setOffers(data.items || []);
      } catch {
        // mock fallback
        const mock = makeMockOffers(from, to, date);
        if (!cancelled) setOffers(mock);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [from, to, date]);

  const filtered = useMemo(() => {
    let list = offers.slice();

    if (nonstop) list = list.filter(o => (o.segments.length - 1) === 0);
    if (typeof maxPrice === "number") list = list.filter(o => o.price <= maxPrice);

    list.sort((a, b) => {
      if (sort === "price") return a.price - b.price;
      if (sort === "duration") return sumDur(a) - sumDur(b);
      if (sort === "depart") return new Date(a.segments[0].depart).getTime() - new Date(b.segments[0].depart).getTime();
      return 0;
    });

    return list;
  }, [offers, nonstop, sort, maxPrice]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">
        Резултати: {from || "—"} → {to || "—"} {date ? `• ${date}` : ""}
      </h2>

      <FlightsFilters
        nonstop={nonstop} onNonstop={setNonstop}
        sort={sort} onSort={setSort}
        maxPrice={maxPrice} onMaxPrice={setMaxPrice}
      />

      <div className="mt-4">
        {loading ? (
          <FlightsSkeleton />
        ) : error ? (
          <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-rose-800">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
            Няма намерени полети за избраните критерии.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((o) => <FlightCard key={o.id} offer={o} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function sumDur(o: FlightOffer) {
  return o.segments.reduce((a, s) => a + s.durationMinutes, 0);
}

// --- mock generator (dev only) ---
function makeMockOffers(from: string, to: string, date?: string): FlightOffer[] {
  if (!from || !to) return [];
  const base = new Date(date || new Date().toISOString().slice(0,10));
  const mkSeg = (carrier: string, fn: string, f: string, t: string, depH: number, durM: number): FlightSegment => {
    const d = new Date(base); d.setHours(depH, 0, 0, 0);
    const a = new Date(d); a.setMinutes(a.getMinutes() + durM);
    return { carrier, flightNumber: fn, from: f, to: t, depart: d.toISOString(), arrive: a.toISOString(), durationMinutes: durM, stops: 0 };
  };

  const offers: FlightOffer[] = [
    {
      id: "AN-" + Math.random().toString(36).slice(2, 8),
      segments: [mkSeg("AN", "101", from, to, 8, 140)],
      price: 89, currency: "EUR", refundable: false, baggage: { carryOn: "Cabin 8kg" }, provider: "AirNova"
    },
    {
      id: "LH-" + Math.random().toString(36).slice(2, 8),
      segments: [mkSeg("LH", "1327", from, "FRA", 7, 120), mkSeg("LH", "928", "FRA", to, 10, 95)],
      price: 159, currency: "EUR", refundable: true, baggage: { carryOn: "8kg", checked: "23kg" }, provider: "Lufthansa"
    },
    {
      id: "W6-" + Math.random().toString(36).slice(2, 8),
      segments: [mkSeg("W6", "4451", from, to, 21, 150)],
      price: 49, currency: "EUR", refundable: false, baggage: { carryOn: "Personal item" }, provider: "Wizz"
    },
    {
      id: "BA-" + Math.random().toString(36).slice(2, 8),
      segments: [mkSeg("BA", "089", from, "LHR", 6, 210), mkSeg("BA", "712", "LHR", to, 11, 110)],
      price: 199, currency: "EUR", refundable: true, baggage: { carryOn: "10kg" }, provider: "British Airways"
    }
  ];
  return offers;
}
