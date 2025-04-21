import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";

const PassengerDashboard = () => {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch passenger data from the backend
  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/passenger/all");
        
        // Map to store passenger _id -> seat mapping
        const passengerSeats = {};
        
        // For each passenger, fetch their seat information
        for (const passenger of response.data) {
          try {
            const seatResponse = await axios.get(
              `http://localhost:4000/api/seats/passenger/${passenger.flight_id._id}/${passenger._id}`
            );
            
            if (seatResponse.data && seatResponse.data.seat) {
              passengerSeats[passenger._id] = seatResponse.data.seat.seatNumber;
            }
          } catch (seatError) {
            console.error(`Error fetching seat for passenger ${passenger._id}:`, seatError);
          }
        }
        
        // Format the passenger data for display
        const formattedPassengers = response.data.map(passenger => ({
          _id: passenger._id,
          name: `${passenger.firstName} ${passenger.lastName}`,
          passport: passenger.passport,
          email: passenger.email,
          mobile: passenger.mobile,
          class: passenger.class || "Economy", // Default to Economy if not specified
          seat: passengerSeats[passenger._id] || "Not assigned", // Get seat from our mapping
          gender: passenger.gender,
          documentType: passenger.documentType,
          documentNumber: passenger.documentNumber,
          dateOfBirth: passenger.dateOfBirth,
          flight: {
            _id: passenger.flight_id._id,
            flightNumber: `FE${passenger.flight_id._id.toString().slice(-4)}`, // Create a flight number based on ID
            from: passenger.flight_id.from,
            to: passenger.flight_id.to,
            destination: passenger.flight_id.to, // Destination is the "to" field
            departDate: passenger.flight_id.departDate,
            returnDate: passenger.flight_id.returnDate,
            airlineName: passenger.flight_id.airlineName,
            oneWayPrice: passenger.flight_id.oneWayPrice,
            roundTripPrice: passenger.flight_id.roundTripPrice
          }
        }));
        
        setPassengers(formattedPassengers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching passengers:", error);
        setError("Failed to load passenger data. Please try again later.");
        setLoading(false);
      }
    };

    fetchPassengers();
  }, []);

  // Handle viewing passenger details
  const handleViewPassengerDetails = (passenger) => {
    setSelectedPassenger(passenger);
    setIsViewingDetails(true);
  };

  // Handle back to passengers list
  const handleBackToPassengers = () => {
    setIsViewingDetails(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-6 pb-16">
      {!isViewingDetails ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Passengers List</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Passport</th>
                  <th className="py-2 px-4 text-left">Flight</th>
                  <th className="py-2 px-4 text-left">Destination</th>
                  <th className="py-2 px-4 text-left">Class</th>
                  <th className="py-2 px-4 text-left">Seat</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map((passenger) => (
                  <tr
                    key={passenger._id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-4">{passenger._id.substring(0, 8)}...</td>
                    <td className="py-2 px-4">{passenger.name}</td>
                    <td className="py-2 px-4">{passenger.passport}</td>
                    <td className="py-2 px-4">{passenger.flight.flightNumber}</td>
                    <td className="py-2 px-4">{passenger.flight.destination}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          passenger.class === "First"
                            ? "bg-purple-100 text-purple-800"
                            : passenger.class === "Business"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {passenger.class}
                      </span>
                    </td>
                    <td className="py-2 px-4">{passenger.seat}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleViewPassengerDetails(passenger)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <button
              onClick={handleBackToPassengers}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Passengers List
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Passenger Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{selectedPassenger.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passport Number</p>
                    <p className="font-medium">{selectedPassenger.passport}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedPassenger.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-medium">{selectedPassenger.mobile}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{selectedPassenger.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {selectedPassenger.dateOfBirth ? new Date(selectedPassenger.dateOfBirth).toLocaleDateString() : "Not specified"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Document Type</p>
                    <p className="font-medium">{selectedPassenger.documentType}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Flight Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Flight Number</p>
                    <p className="font-medium">
                      {selectedPassenger.flight.flightNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">
                      {selectedPassenger.flight.airlineName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium">
                      {selectedPassenger.flight.from} to {selectedPassenger.flight.destination}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure Date</p>
                    <p className="font-medium">
                      {new Date(selectedPassenger.flight.departDate).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedPassenger.flight.returnDate && (
                    <div>
                      <p className="text-sm text-gray-500">Return Date</p>
                      <p className="font-medium">
                        {new Date(selectedPassenger.flight.returnDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Flight Price</p>
                    <p className="font-medium">
                      ${selectedPassenger.flight.oneWayPrice} (One-way)
                      {selectedPassenger.flight.roundTripPrice && 
                        ` / $${selectedPassenger.flight.roundTripPrice} (Round-trip)`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          selectedPassenger.class === "First"
                            ? "bg-purple-100 text-purple-800"
                            : selectedPassenger.class === "Business"
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedPassenger.class}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seat</p>
                    <p className="font-medium">{selectedPassenger.seat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;