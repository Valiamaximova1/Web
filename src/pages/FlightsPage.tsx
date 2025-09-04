export default function FlightsPage(){
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Защитени данни (Flights)</h2>
      <div className="rounded-2xl bg-white/90 p-6 border border-gray-100">
        Тук ще извикаме Flight-Ops чрез gateway (с Bearer, auto-refresh).
      </div>
    </div>
  );
}
