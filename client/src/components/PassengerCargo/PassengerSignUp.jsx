import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig"; // Import axios instance

const PassengerSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contactNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/auth/signup", formData);
      const { success, message } = response.data;
      console.log(response.data);//added

      if (success) {
        navigate("/login"); // Redirect to login page
      } else {
        setErrorMessage(message || "Signup failed");
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
    <div className="relative flex justify-center items-center min-h-screen p-4 bg-gray-50 pt-10">
      <div className="relative z-10 bg-white shadow-2xl rounded-3xl w-full max-w-4xl p-8">
        <h2 className="text-center text-3xl font-bold text-blue-800 mb-6">
          Create an Account
        </h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter your contact number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>
          {/* added */}
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input 
              type="number" 
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              placeholder="Enter your age" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-700  transition duration-300" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <button type="button" onClick={() => navigate("/login")} className="text-blue-700 hover:underline cursor-pointer">
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PassengerSignUp;
