import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ADDED useNavigate
import DecorativeCircle from "../components/DecorativeCircle";
import { Ticket } from "lucide-react";
import { saveSession } from "../utils/storage";

const AuthPage = ({ isLogin, onLoginSuccess, showToast }) => {
  const navigate = useNavigate(); // ADDED: useNavigate hook
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard"; // Redirect to dashboard after login

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!isLogin && !formData.name) newErrors.name = "Name is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast("Please fix the errors in the form", "error");
      return;
    }

    const userData = {
      email: formData.email,
      name: formData.name || formData.email.split("@")[0],
    };
    saveSession(userData);
    onLoginSuccess(userData);
    showToast(
      isLogin ? "Login successful!" : "Account created successfully!",
      "success"
    );
    
    // FIXED: Use navigate instead of onNavigate
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <DecorativeCircle size="350px" top="-50px" left="-50px" opacity={0.1} />
      <DecorativeCircle
        size="250px"
        bottom="-50px"
        right="-50px"
        opacity={0.12}
      />

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <div className="text-center mb-8">
          <Ticket className="text-indigo-600 mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin
              ? "Login to manage your tickets"
              : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(isLogin ? "/signup" : "/login")} // FIXED
            className="text-indigo-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/")} // FIXED
            className="text-gray-600 hover:underline text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;