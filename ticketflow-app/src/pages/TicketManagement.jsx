import { useState } from "react";
// import { useNavigate } from 'react-router-dom'; // FIXED: Added import
import { Plus, Edit2, Trash2, Ticket } from "lucide-react";

const TicketManagement = ({ tickets, saveTickets, showToast }) => {
  //   const navigate = useNavigate(); // FIXED: Added useNavigate hook
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = "Status must be open, in_progress, or closed";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix validation errors", "error");
      return;
    }

    if (editingTicket) {
      const updated = tickets.map((t) =>
        t.id === editingTicket.id ? { ...formData, id: t.id } : t
      );
      saveTickets(updated);
      showToast("Ticket updated successfully", "success");
    } else {
      const newTicket = { ...formData, id: Date.now() };
      saveTickets([...tickets, newTicket]);
      showToast("Ticket created successfully", "success");
    }

    setShowForm(false);
    setEditingTicket(null);
    setFormData({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
    setErrors({});
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData(ticket);
    setShowForm(true);
    setErrors({});
  };

  const handleDelete = (id) => {
    const updated = tickets.filter((t) => t.id !== id);
    saveTickets(updated);
    showToast("Ticket deleted successfully", "success");
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-amber-100 text-amber-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Ticket Management
            </h1>
            <p className="text-gray-600">
              Create, view, edit, and manage your tickets
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTicket(null);
              setFormData({
                title: "",
                description: "",
                status: "open",
                priority: "medium",
              });
              setErrors({});
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-lg"
          >
            <Plus size={20} />
            <span>New Ticket</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 border-2 border-indigo-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingTicket ? "Edit Ticket" : "Create New Ticket"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  rows="4"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  {editingTicket ? "Update Ticket" : "Create Ticket"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTicket(null);
                    setErrors({});
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow">
              <Ticket className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600">
                No tickets yet. Create your first ticket to get started!
              </p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {ticket.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {ticket.description || "No description provided"}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(ticket)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                  >
                    <Edit2 size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(ticket.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this ticket? This action cannot be
              undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 TicketHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TicketManagement;
