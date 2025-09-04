export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Профил</h2>
        <p className="text-sm text-slate-600">Основни данни и предпочитания.</p>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">Име</label>
          <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="Иван" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Фамилия</label>
          <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="Петров" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Имейл</label>
          <input disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 h-11" value="you@example.com" />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Телефон</label>
          <input className="w-full rounded-xl border border-slate-300 px-3 h-11" placeholder="+359..." />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Език</label>
          <select className="w-full rounded-xl border border-slate-300 px-3 h-11">
            <option>BG</option><option>EN</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Валута</label>
          <select className="w-full rounded-xl border border-slate-300 px-3 h-11">
            <option>BGN</option><option>EUR</option>
          </select>
        </div>

        <div className="sm:col-span-2 mt-2">
          <button type="button" className="rounded-xl bg-indigo-600 text-white px-5 h-11 hover:bg-indigo-700">
            Запази
          </button>
        </div>
      </form>
    </div>
  );
}
