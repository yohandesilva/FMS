import React from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerBooking from "../../assets/PassengerCargo/PassengerBooking.jpg";
import CargoBooking from "../../assets/PassengerCargo/CargoBooking.jpg";

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handlePassengerNavigation = () => {
    navigate('/flights');
  };

  const handleCargoNavigation = () => {
    navigate('/cargo');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
      {/* Section Header with Animation */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
          Welcome to SkyWay Airlines
          <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Your trusted partner for passenger and cargo transportation
        </p>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
        {/* Passenger Booking Feature */}
        <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
          <img
            src={PassengerBooking}
            alt="Airplane view"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Content with slide-up animation */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-1 bg-blue-400 mr-3 group-hover:w-16 transition-all duration-300"></div>
              <h2 className="text-xl sm:text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">
                Global Network
              </h2>
            </div>
            <p className="text-sm sm:text-base opacity-90 max-w-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              Connecting you to destinations worldwide with premium comfort and convenience
            </p>
            
            {/* Book Now button with navigation */}
            <button 
              onClick={handlePassengerNavigation}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-medium hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </div>
        
        {/* Cargo Booking Feature */}
        <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
          <img
            src={CargoBooking}
            alt="Cargo loading"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
          
          {/* Content with slide-up animation */}
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-1 bg-blue-400 mr-3 group-hover:w-16 transition-all duration-300"></div>
              <h2 className="text-xl sm:text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">
                Reliable Cargo Services
              </h2>
            </div>
            <p className="text-sm sm:text-base opacity-90 max-w-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
              Safe and efficient cargo transportation with tracking and expedited delivery options
            </p>
            
            {/* Ship Now button with navigation */}
            <button 
              onClick={handleCargoNavigation}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm font-medium hover:bg-blue-600"
            >
              Ship Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Add this to your global CSS file for the fade-in animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FeaturesSection;