import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// публични
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import DealsPage from "./pages/DealsPage";
import SupportPage from "./pages/SupportPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

// защитени
import FlightsPage from "./pages/FlightsPage";
import AccountLayout from "./layouts/AccountLayout";
import ProfilePage from "./pages/me/ProfilePage";
import TravelersPage from "./pages/me/TravelersPage";
import BookingsPage from "./pages/me/BookingsPage";

// booking стъпки
import BookLayout from "./pages/book/BookLayout";
import PassengersStep from "./pages/book/PassengersStep";
import SeatsStep from "./pages/book/SeatsStep";
import PaymentStep from "./pages/book/PaymentStep";

// admin
import AdminPage from "./pages/admin/AdminPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchResultsPage /> },
      { path: "flight/:id", element: <FlightDetailsPage /> },
      { path: "deals", element: <DealsPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "login", element: <LoginPage /> },
        { path: "flights", element: <FlightsPage /> },
      { path: "register", element: <RegisterPage /> },
          { path: "verify-email", element: <VerifyEmailPage /> },

      // защитени зони
      {
        element: <ProtectedRoute />, // изисква login
        children: [
        

          { path: "me", element: <AccountLayout />, children: [
            { index: true, element: <ProfilePage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "travelers", element: <TravelersPage /> },
            { path: "bookings", element: <BookingsPage /> }
          ]},

          { path: "book/:id", element: <BookLayout />, children: [
            { index: true, element: <PassengersStep /> },
            { path: "passengers", element: <PassengersStep /> },
            { path: "seats", element: <SeatsStep /> },
            { path: "payment", element: <PaymentStep /> }
          ]},
        ]
      },

      // admin (роля ADMIN)
      {
        element: <ProtectedRoute roles={["ADMIN"]} />,
        children: [
          { path: "admin", element: <AdminPage /> }
        ]
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
