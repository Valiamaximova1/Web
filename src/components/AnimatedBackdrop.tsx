export default function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl floaty" />
      <div className="absolute top-20 right-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl floaty" style={{animationDelay:"1.2s"}}/>
      <svg className="absolute inset-x-0 -bottom-10 w-full" height="180" viewBox="0 0 1200 180" fill="none">
        <path d="M0 120 C 300 60, 900 180, 1200 100 L1200 180 L0 180 Z" fill="url(#g)"/>
        <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity=".15"/><stop offset="100%" stopColor="#7C3AED" stopOpacity=".15"/>
        </linearGradient></defs>
      </svg>
    </div>
  );
}
