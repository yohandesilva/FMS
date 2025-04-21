import React, { useState } from "react";
import axios from "../../axiosConfig";
import { Mail, MapPin, Phone, Facebook, Youtube } from "lucide-react";

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/contact/contactSupport", formData);
      setSuccessMessage("Your inquiry has been submitted successfully.");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    } catch (error) {
      setErrorMessage("Failed to send your inquiry. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-10 left-10 w-40 md:w-80 h-40 md:h-80 bg-blue-800 rounded-full opacity-30 animate-pulse" />
      <div className="absolute -bottom-10 right-4 w-32 md:w-60 h-32 md:h-60 bg-blue-700 rounded-full opacity-40 animate-bounce" />

      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden w-full max-w-6xl relative z-10 bg-white">
        <div className="bg-gradient-to-b from-blue-950 to-blue-800 text-white p-6 md:p-8 w-full md:w-2/5 flex flex-col justify-between rounded-t-lg md:rounded-t-none md:rounded-l-lg">
          <h2 className="text-xl md:text-2xl font-bold">Contact Information</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center space-x-3"><Phone size={18} /><span>+94 112 695 300</span></div>
            <div className="flex items-center space-x-3"><Mail size={18} /><span>demo@gmail.com</span></div>
            <div className="flex items-start space-x-3"><MapPin size={18} className="mt-1" /><span>Colombo Bandaranaike International Airport, Sri Lanka</span></div>
          </div>
          <div className="flex space-x-4 mt-6">
            <Facebook size={20} className="cursor-pointer hover:text-blue-400 transition" />
            <Youtube size={20} className="cursor-pointer hover:text-red-500 transition" />
          </div>
        </div>

        <div className="p-6 md:p-8 w-full md:w-3/5">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Submit Your Inquiry</h2>
          {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
          {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input className="p-3 border rounded-lg w-full" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
              <input className="p-3 border rounded-lg w-full" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              <input className="p-3 border rounded-lg w-full" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              <input className="p-3 border rounded-lg w-full" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Select Subject</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['General Inquiry', 'Support', 'Feedback'].map((subject) => (
                  <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="subject" value={subject} checked={formData.subject === subject} onChange={handleChange} className="accent-blue-500" />
                    <span>{subject}</span>
                  </label>
                ))}
              </div>
            </div>
            <textarea className="w-full mt-4 p-3 border rounded-lg" rows="4" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message..." required></textarea>
            <button type="submit" className="mt-4 bg-blue-800 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform" disabled={loading}>{loading ? "Submitting..." : "Submit >"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;