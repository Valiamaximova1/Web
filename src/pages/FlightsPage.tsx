// src/pages/FlightsPage.tsx
import { useEffect, useState } from "react";

const BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:18080";

export default function FlightsPage(){
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE}/api/v1/flights/search?from=SOF&to=LHR&date=2025-10-01`);
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch { setData([]); }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Полетни оферти</h2>
      <pre className="rounded-xl bg-white/90 p-6 border border-gray-100">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
