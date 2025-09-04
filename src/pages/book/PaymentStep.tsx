export default function PaymentStep() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-lg font-semibold mb-3">Плащане</div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Име на карта</label>
            <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="Ivan Petrov" />
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Номер на карта</label>
            <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="4242 4242 4242 4242" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">MM/YY</label>
              <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="12/27" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">CVC</label>
              <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="123" />
            </div>
          </div>
          <button type="button" className="mt-2 rounded-xl bg-indigo-600 text-white px-5 h-11 w-full">
            Плати
          </button>
          <p className="text-xs text-slate-500">Това е демо форма (без реална транзакция).</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-lg font-semibold mb-3">Обобщение</div>
        <ul className="text-sm text-slate-700 space-y-2">
          <li>SOF → LON (01 Май 2025) • 2 пътници</li>
          <li>Места: 3C, 3D</li>
          <li>Багаж: 2× ръчен</li>
        </ul>
        <div className="h-px bg-slate-200 my-3" />
        <div className="flex items-center justify-between text-sm">
          <span>Билет</span><span>€120</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Такси</span><span>€19</span>
        </div>
        <div className="mt-2 flex items-center justify-between font-semibold">
          <span>Общо</span><span>€139</span>
        </div>
      </section>
    </div>
  );
}
