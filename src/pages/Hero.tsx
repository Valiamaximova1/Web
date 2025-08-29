export default function Hero(){
  return (
    <section className="hero-wrap relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-28 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">
          Book your next flight in <span className="text-[var(--brand)]">seconds</span>
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          Smart search, real-time seatmaps, transparent pricing.
        </p>
      </div>
      <div className="hero-wave h-32 w-full"></div>
    </section>
  );
}
