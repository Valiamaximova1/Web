type Props = {
  nonstop: boolean; onNonstop: (v: boolean) => void;
  sort: "price" | "duration" | "depart"; onSort: (v: Props["sort"]) => void;
  maxPrice?: number; onMaxPrice: (v: number | undefined) => void;
};

export default function FlightsFilters({ nonstop, onNonstop, sort, onSort, maxPrice, onMaxPrice }: Props) {
  return (
    <div className="sticky top-[56px] z-10 bg-white/80 backdrop-blur rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-wrap items-center gap-3">
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" checked={nonstop} onChange={e=>onNonstop(e.target.checked)} />
        Nonstop
      </label>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-600">Sort:</span>
        <select
          className="rounded-lg border border-slate-300 px-2 py-1"
          value={sort}
          onChange={e=>onSort(e.target.value as Props["sort"])}
        >
          <option value="price">Price</option>
          <option value="duration">Duration</option>
          <option value="depart">Depart time</option>
        </select>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate-600">Max price:</span>
        <input
          type="number"
          className="w-24 rounded-lg border border-slate-300 px-2 py-1"
          value={maxPrice ?? ""}
          onChange={e=>{
            const v = e.target.value.trim();
            onMaxPrice(v === "" ? undefined : Math.max(0, Number(v)));
          }}
          placeholder="€"
        />
      </div>
    </div>
  );
}
