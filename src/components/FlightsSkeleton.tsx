export default function FlightsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white border border-slate-100 p-4 animate-pulse">
          <div className="h-5 w-1/3 bg-slate-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-slate-200 rounded" />
          <div className="mt-3 h-10 w-full bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
}
