import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig"; // Import axios instance
import Logo from "../../assets/PassengerCargo/logo-menu.png";

const PassengerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    //console.log("Sending data to backend:", formData); // ✅ Check formData in console

    try {
      const response = await axios.post("/auth/login", formData);
      const { success, token, message } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        navigate("/dashboard"); // Redirect to the dashboard
      } else {
        setErrorMessage(message || "Login failed");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("Server not reachable. Please try again later.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6">
        <div className="flex justify-center mb-4 bg-gradient-to-b from-blue-900 to-blue-800 p-6 rounded-xl">
          <img src={Logo} alt="Faculty of Medicine Logo" className="h-12" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-900 mb-4">
          Sign In
        </h2>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Login</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email" // Change from "Email or phome number" (indunil-k)
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-2 text-gray-500 cursor-pointer"
              >
                {showPassword ? "🔒" : "👁"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
            <label className="flex items-center text-gray-700 text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign up now
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PassengerLogin;
