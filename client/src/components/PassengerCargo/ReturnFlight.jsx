import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plane, Calendar, Clock } from "lucide-react";

const ReturnFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flights = location.state?.flights || []; // Get flights from state
  const selectedDepartureFlight = location.state?.selectedDepartureFlight; // Get selected departure flight

  const handleContinueClick = (selectedReturnFlight) => {
    // Navigate to price-details page with selected flights
    navigate("/price-details", {
      state: {
        selectedDepartureFlight: selectedDepartureFlight,
        selectedReturnFlight: selectedReturnFlight,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Available Return Flights
        </h1>

        {flights.length === 0 ? (
          <p className="text-center text-gray-600">No flights found.</p>
        ) : (
          flights.map((flight) => (
            <div
              key={flight._id}
              className="bg-white rounded-lg shadow-md p-4 mb-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-blue-800">
                    {flight.to} to {flight.from}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Airline: {flight.airlineName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Return: {new Date(flight.returnDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Departure Time: 3:00 PM {/* Hardcoded default value */}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: 5h 15m {/* Hardcoded default value */}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleContinueClick(flight)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReturnFlight;