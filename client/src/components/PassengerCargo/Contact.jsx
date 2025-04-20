import React from "react";
import { Mail, MapPin, Phone, Facebook, Youtube } from "lucide-react";

const ContactSupport = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 overflow-hidden contact-support-container">
      {/* Decorative Elements - Enhanced with Green and Orange Colors */}
      <div className="absolute top-10 left-10 w-40 md:w-80 h-40 md:h-80 bg-blue-800 rounded-full opacity-30 animate-pulse decorative-circle-1" />
      <div className="absolute -bottom-10 right-4 w-32 md:w-60 h-32 md:h-60 bg-blue-700 rounded-full opacity-40 animate-bounce decorative-circle-2" />
      <div className="absolute top-1/3 left-1/4 w-10 md:w-16 h-10 md:h-16 bg-blue-300 rounded-full opacity-50 animate-spin decorative-circle-3" />

      {/* Main Container with Enhanced Shadow and Depth */}
      <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl relative z-10 bg-white main-container">
        {/* Contact Information Section with Green Gradient */}
        <div className="bg-gradient-to-b from-blue-950 to-blue-800 text-white p-6 md:p-8 w-full md:w-2/5 lg:w-1/3 flex flex-col justify-between contact-info-section">
          <div>
            <h2 className="text-xl md:text-2xl font-bold contact-title">Contact Information</h2>
            <p className="mt-2 text-sm md:text-base contact-subtitle">We're here to help</p>
            <div className="mt-4 md:mt-6 space-y-3 md:space-y-4 contact-details">
              <div className="flex items-center space-x-3 contact-detail">
                <Phone size={18} className="contact-icon" />
                <span className="text-sm md:text-base">+94 112 695 300</span>
              </div>
              <div className="flex items-center space-x-3 contact-detail">
                <Mail size={18} className="contact-icon" />
                <span className="text-sm md:text-base">support@skyway.com</span>
              </div>
              <div className="flex items-start space-x-3 contact-detail">
                <MapPin size={18} className="mt-1 flex-shrink-0 contact-icon" />
                <span className="text-sm md:text-base">Colombo Bandaranaike International Airport (CMB), Airport and Aviation Services (Sri Lanka) (Private) Limited, Canada Friendship Rd, Katunayake 11450, Sri Lanka.</span>
              </div>
            </div>
          </div>
          {/* Social Media Icons with Hover Effects */}
          <div className="flex space-x-4 mt-6 social-icons">
            <Facebook size={20} className="cursor-pointer social-icon facebook-icon hover:text-blue-400 transition-all duration-300 transform hover:scale-110" />
            <Youtube size={20} className="cursor-pointer social-icon youtube-icon hover:text-orange-500 transition-all duration-300 transform hover:scale-110" />
          </div>
        </div>

        {/* Contact Form Section with Enhanced Styling */}
        <div className="p-6 md:p-8 w-full md:w-3/5 lg:w-2/3 rounded-b-lg md:rounded-b-none md:rounded-r-lg contact-form-section">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 form-title">Submit Your Inquiry</h2>
          <form onSubmit={(e) => e.preventDefault()} className="contact-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <input 
                  className="p-3 border-2 border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base form-input" 
                  type="text" 
                  placeholder="First Name" 
                  required 
                />
              </div>
              <div>
                <input 
                  className="p-3 border-2 border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base form-input" 
                  type="text" 
                  placeholder="Last Name" 
                  required 
                />
              </div>
              <div>
                <input 
                  className="p-3 border-2 border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base form-input" 
                  type="email" 
                  placeholder="Email" 
                  required 
                />
              </div>
              <div>
                <input 
                  className="p-3 border-2 border-blue-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base form-input" 
                  type="tel" 
                  placeholder="Phone Number" 
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block font-semibold text-sm md:text-base subject-label">Select Subject</label>
              <div className="flex flex-wrap gap-4 mt-2 subject-options">
                <label className="flex items-center space-x-2 cursor-pointer subject-option">
                  <input 
                    type="radio" 
                    name="subject" 
                    className="accent-blue-500 focus:ring-2 focus:ring-blue-300" 
                  /> 
                  <span className="text-sm md:text-base">General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer subject-option">
                  <input 
                    type="radio" 
                    name="subject" 
                    className="accent-blue-500 focus:ring-2 focus:ring-blue-300" 
                  /> 
                  <span className="text-sm md:text-base">Support</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer subject-option">
                  <input 
                    type="radio" 
                    name="subject" 
                    className="accent-blue-500 focus:ring-2 focus:ring-blue-300" 
                  /> 
                  <span className="text-sm md:text-base">Feedback</span>
                </label>
              </div>
            </div>
            
            <textarea 
              className="w-full mt-4 p-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm md:text-base form-textarea" 
              rows="4" 
              placeholder="Write your message..."
              required
            ></textarea>
            
            <button 
              type="submit"
              className="mt-4 bg-gradient-to-r from-green-950 to-blue-800 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform text-sm md:text-base submit-button"
            >
              Submit &gt;
            </button>
          </form>
        </div>
      </div>

      {/* Additional CSS for Enhanced Interactivity and Design */}
      <style jsx>{`
        /* Container Styles */
        .contact-support-container {
          background: linear-gradient(135deg, rgba(46, 204, 113, 0.1) 0%, rgba(243, 156, 18, 0.1) 100%);
        }

        /* Decorative Circles */
        .decorative-circle-1 {
          animation: pulse-green 3s infinite;
        }

        .decorative-circle-2 {
          animation: pulse-orange 3s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes pulse-orange {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(0.9); }
        }

        /* Main Container */
        .main-container {
          perspective: 1000px;
          transition: all 0.3s ease;
        }

        .main-container:hover {
          transform: rotateX(2deg) rotateY(-2deg);
          box-shadow: 0 25px 50px rgba(46, 204, 113, 0.2);
        }

        /* Contact Info Section */
        .contact-info-section {
          transition: all 0.3s ease;
        }

        .contact-info-section .contact-icon {
          transition: transform 0.3s ease;
        }

        .contact-info-section .contact-detail:hover .contact-icon {
          transform: scale(1.2) rotate(10deg);
          color: #f39c12;
        }

        /* Social Icons */
        .social-icons .social-icon {
          transition: all 0.3s ease;
        }

        .facebook-icon:hover {
          color: #2ecc71;
        }

        .youtube-icon:hover {
          color: #e74c3c;
        }

        /* Form Inputs */
        .form-input, .form-textarea {
          border-color: rgba(46, 204, 113, 0.3);
          transition: all 0.3s ease;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #2ecc71;
          box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
        }

        /* Subject Options */
        .subject-option {
          transition: all 0.3s ease;
        }

        .subject-option:hover {
          color: #2ecc71;
          transform: translateX(5px);
        }

        /* Submit Button */
        .submit-button {
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: all 0.3s ease;
          z-index: -1;
        }

        .submit-button:hover::before {
          left: 100%;
        }

        .submit-button:hover {
          background: linear-gradient(to right, #27ae60, #f39c12);
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .contact-support-container {
            padding: 2rem 1rem;
          }

          .decorative-circle-1, 
          .decorative-circle-2, 
          .decorative-circle-3 {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactSupport;