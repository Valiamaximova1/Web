import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      <Header />
      <main className="min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>
    </div>
  );
}
