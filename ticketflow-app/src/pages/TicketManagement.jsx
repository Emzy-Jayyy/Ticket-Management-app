import React from "react";
import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";

const TicketManagement = () => {
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
    if (!["open", "in_progress", "closed"].includes(formData.status))
      newErrors.status = "Status must be open, in_progress, or closed";
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
  
};

export default TicketManagement;
