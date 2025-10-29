import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Toast from "./components/ToastNotification";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/DashBoard";
import TicketManagement from "./pages/TicketManagement";
import {
  loadSession,
  loadTickets,
  saveTickets as persistTickets,
  clearSession,
} from "./utils/storage";

function RequireAuth({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [toast, setToast] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const s = loadSession();
    const t = loadTickets();
    if (s) {
      setUser(s);
      setIsAuthenticated(true);
    }
    if (t) setTickets(t);
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type });
  const closeToast = () => setToast(null);

  const onLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const onLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setUser(null);
    showToast("Logged out successfully", "success");
  };

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    persistTickets(newTickets);
  };

  return (
    <div className="relative">
      <NavBar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <AuthPage
              isLogin={true}
              onLoginSuccess={onLoginSuccess}
              showToast={showToast}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <AuthPage
              isLogin={false}
              onLoginSuccess={onLoginSuccess}
              showToast={showToast}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Dashboard user={user} tickets={tickets} />
            </RequireAuth>
          }
        />

        <Route
          path="/tickets"
          element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <TicketManagement
                tickets={tickets}
                saveTickets={saveTickets}
                showToast={showToast}
              />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
