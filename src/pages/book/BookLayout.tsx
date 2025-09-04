import { NavLink, Outlet, useParams } from "react-router-dom";

export default function BookLayout(){
  const { id } = useParams();
  const tab = "px-3 py-2 rounded-xl text-sm hover:bg-white/70";
  const active = "bg-white shadow-sm border border-slate-100";
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-xl font-semibold mb-4">Резервация #{id}</h2>
      <div className="mb-4 flex gap-2">
        <NavLink to="passengers" className={({isActive}) => `${tab} ${isActive?active:""}`}>Пътници</NavLink>
        <NavLink to="seats" className={({isActive}) => `${tab} ${isActive?active:""}`}>Места</NavLink>
        <NavLink to="payment" className={({isActive}) => `${tab} ${isActive?active:""}`}>Плащане</NavLink>
      </div>
      <div className="rounded-2xl bg-white/90 p-6 border border-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
