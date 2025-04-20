import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Clock, Calendar, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const DepartureFlight = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const navigate = useNavigate();

  const handleModifyClick = () => {
    navigate('/flights');
  };

  const handleContinueClick = () => {
    navigate('/return-flight');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Available Flights</h1>
        
        {/* Flight Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-8">
          {/* Flight Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center mb-4 sm:mb-0">
                <Plane className="mr-3 h-6 w-6 transform rotate-45" />
                <div>
                  <p className="text-xl font-bold">COLOMBO TO ABU DHABI</p>
                  <p className="text-sm opacity-90">Bandaranaike Intl (CMB) to Zayed International Airport (AUH)</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <span>Mon, 15 May 2023</span>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">18:50</p>
                  <p className="text-sm text-gray-600">CMB</p>
                </div>
                <div className="mx-4 flex flex-col items-center">
                  <div className="relative">
                    <div className="h-1 w-16 bg-blue-300 rounded-full"></div>
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>4h 40m</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">22:00</p>
                  <p className="text-sm text-gray-600">AUH</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-3 w-full md:w-auto">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-blue-800">Srilankan Airlines</p>
                    <p className="text-xs text-blue-600">UL 225 • Airbus A330-200</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-700">LKR 62,687</p>
                    <p className="text-xs text-blue-600">One way</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-4">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-0"
              >
                {showDetails ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Hide details
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    View details
                  </>
                )}
              </button>

              <div className="flex space-x-3 w-full sm:w-auto">
                <button 
                  onClick={handleModifyClick}
                  className="flex-1 sm:flex-none px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
                >
                  Modify
                </button>
                <button 
                  onClick={handleContinueClick}
                  className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Expanded Details (remains the same as previous implementation) */}
            {showDetails && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-medium text-gray-700 mb-3">Flight Details</h3>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Plane className="h-4 w-4 text-blue-600 transform rotate-45" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-medium text-blue-800">Srilankan Airlines UL 225</h4>
                        <span className="text-xs bg-green-100 text-blue-800 px-2 py-1 rounded">
                          Economy Class
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Airbus A330-200 • 3-3-3 configuration</p>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Departure</p>
                          <p className="font-bold">18:50</p>
                          <p className="text-xs text-gray-500">Bandaranaike Intl (CMB)</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">Duration</p>
                          <p className="font-bold">4h 40m</p>
                          <p className="text-xs text-gray-500">Direct flight</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700">Arrival</p>
                          <p className="font-bold">22:00</p>
                          <p className="text-xs text-gray-500">Zayed International Airport (AUH)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Baggage Information</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cabin baggage:</span>
                      <span className="font-medium">1 x 7kg</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Checked baggage:</span>
                      <span className="font-medium">1 x 30kg</span>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Fare Rules</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Refundable:</span>
                      <span className="font-medium">No</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Date change:</span>
                      <span className="font-medium">With fee</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-green-50 transition duration-200 font-medium">
            Show More Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartureFlight;