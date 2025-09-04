import { NavLink, Outlet } from "react-router-dom";

export default function AccountLayout() {
  const link =
    "px-3 py-2 rounded-xl text-sm text-slate-700 hover:bg-white/70 hover:text-slate-900";
  const active = "bg-white text-slate-900 shadow-sm border border-slate-100";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1 space-y-2">
        <NavLink to="/me/profile" className={({isActive}) => `${link} ${isActive?active:""}`}>Профил</NavLink>
        <NavLink to="/me/travelers" className={({isActive}) => `${link} ${isActive?active:""}`}>Запазени пътници</NavLink>
        <NavLink to="/me/bookings" className={({isActive}) => `${link} ${isActive?active:""}`}>Моите резервации</NavLink>
      </aside>
      <section className="lg:col-span-3 rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100 p-6 sm:p-8">
        <Outlet />
      </section>
    </div>
  );
}
