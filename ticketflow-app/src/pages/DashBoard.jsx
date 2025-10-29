import { CheckCircle, Clock, Ticket, XCircle } from "lucide-react";

const Dashboard = ({ user, tickets, onNavigate, onLogout }) => {
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  const cards = [
    {
      label: "Total Tickets",
      value: stats.total,
      icon: Ticket,
      colorClass: "text-indigo-600",
    },
    {
      label: "Open",
      value: stats.open,
      icon: XCircle,
      colorClass: "text-green-600",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      colorClass: "text-amber-600",
    },
    {
      label: "Closed",
      value: stats.closed,
      icon: CheckCircle,
      colorClass: "text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Overview of your ticket management system
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className={`mb-3 ${c.colorClass}`}>
                <c.icon size={32} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{c.value}</p>
              <p className="text-gray-600 text-sm">{c.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("tickets")}
              className="w-full flex items-center justify-between px-6 py-4 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
            >
              <span className="flex items-center space-x-3">
                <Ticket className="text-indigo-600" />
                <span className="font-semibold text-gray-900">
                  Manage Tickets
                </span>
              </span>
              <span className="text-indigo-600">→</span>
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
