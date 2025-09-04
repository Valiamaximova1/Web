const rows = [
  { id: "BK-10021", route: "SOF → LON", date: "2025-03-22", status: "Paid", price: "€139" },
  { id: "BK-10022", route: "SOF → FRA", date: "2025-04-05", status: "Pending", price: "€89" },
];

export default function BookingsPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Моите резервации</h2>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">ID</th><th className="py-2">Маршрут</th><th className="py-2">Дата</th><th className="py-2">Статус</th><th className="py-2">Цена</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="py-2">{r.id}</td>
                <td className="py-2">{r.route}</td>
                <td className="py-2">{r.date}</td>
                <td className="py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    r.status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>{r.status}</span>
                </td>
                <td className="py-2">{r.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
