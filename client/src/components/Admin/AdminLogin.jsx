import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/PassengerCargo/logo-menu.png";
import axios from "../../axiosConfig";


const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" }); // Changed username to email
  const [animateForm, setAnimateForm] = useState(false);
  const [error, setError] = useState(""); // Added for error handling
  const [loading, setLoading] = useState(false); // Added for loading state

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateForm(true);
    }, 100);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const response = await fetch("/admin/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok && data.success) {
  //       // Store the token in localStorage
  //       localStorage.setItem("adminToken", data.token);
  //       // Navigate to admin dashboard
  //       navigate("/admin");
  //     } else {
  //       setError(data.message || "Login failed. Please check your credentials.");
  //     }
  //   } catch (err) {
  //     console.error("Login Error:", err);
  //     setError("An error occurred. Please try again later.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/admin/login", formData); // Use axios.post
      const data = response.data; // axios automatically parses JSON

      if (response.status === 200 && data.success) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };
  /////

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-10 -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 rounded-full bg-purple-500 opacity-10 -bottom-20 -right-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-10 top-1/4 right-1/4 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div
        className={`bg-white backdrop-blur-lg bg-opacity-90 shadow-2xl rounded-2xl w-full max-w-md p-8 transform transition-all duration-500 ${
          animateForm ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex justify-center mb-6 bg-gradient-to-r from-blue-800 to-indigo-900 p-6 rounded-xl shadow-lg transform -mt-16 relative">
          <div className="absolute inset-0 bg-white opacity-20 rounded-xl"></div>
          <img src={Logo} alt="Company Logo" className="h-16 relative z-10" />
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Admin Portal
        </h2>

        {error && (
          <div className="mb-4 text-center text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="email" // Changed from username to email
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 shadow-sm"
                required
              />
            </div>
          </div>

          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-gray-50 shadow-sm"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-indigo-800"
            }`}
          >
            <span className="flex items-center justify-center">
              <span>{loading ? "Signing in..." : "Sign in"}</span>
              {!loading && (
                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Secure Admin Access Portal
            <span className="mx-1">•</span>
            <span className="text-blue-600">{new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;