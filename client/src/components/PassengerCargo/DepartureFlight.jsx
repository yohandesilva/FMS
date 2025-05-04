import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plane, Calendar, Clock } from "lucide-react";

const DepartureFlight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const flights = location.state?.flights || []; // Get flights from state
  const tripType = location.state?.tripType || "round"; // Get trip type from state

  const handleContinueClick = (selectedFlight) => {
    // Determine the correct price based on the trip type
    const priceToPass = tripType === "round"
      ? selectedFlight.roundTripPrice // Use roundTripPrice if it's a round trip
      : selectedFlight.oneWayPrice;   // Use oneWayPrice if it's a one-way trip

    // Ensure a valid price is passed (handle cases where roundTripPrice might be missing)
    const validPrice = typeof priceToPass === 'number' ? priceToPass : selectedFlight.oneWayPrice;

    console.log(`Trip Type: ${tripType}, Price to pass: ${validPrice}`); // Add log for debugging

    // Navigate to PassengerDetails instead of BookSeat
    navigate("/passenger-details", {
      state: {
        flight_id: selectedFlight._id, // Pass the flight ID
        flightPrice: validPrice,       // Pass the CORRECT price based on tripType
        tripType,                      // Pass the trip type
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Available Flights
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
                    {flight.from} to {flight.to}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Airline: {flight.airlineName}
                  </p>
                  <br />
                  <p className="text-sm text-gray-600">
                    Departure:{" "}
                    {new Date(flight.departDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Departure Time: 10:00 AM {/* Hardcoded default value */}
                  </p>
                  <br />
                  <p className="text-sm text-gray-600">
                    Duration: 4h 30m {/* Hardcoded default value */}
                  </p>
                  <br />
                  {tripType === "round" && flight.returnDate && ( // Check if returnDate exists for round trip display
                    <>
                      <p className="text-sm text-gray-600">
                        Return Date:{" "}
                        {new Date(flight.returnDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Return Time: 6:00 PM {/* Hardcoded default value */}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    One-Way Price:{" "}
                    <span className="text-lg font-bold text-blue-800">
                      ${flight.oneWayPrice}
                    </span>
                  </p>
                  {/* Only show Round-Trip Price if it exists */}
                  {typeof flight.roundTripPrice === 'number' && (
                    <p className="text-sm text-gray-600">
                      Round-Trip Price:{" "}
                      <span className="text-lg font-bold text-blue-800">
                        ${flight.roundTripPrice}
                      </span>
                    </p>
                  )}
                  <button
                    onClick={() => handleContinueClick(flight)}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Select
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

export default DepartureFlight;