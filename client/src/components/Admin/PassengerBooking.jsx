import React, { useState } from 'react';

const PassengerDashboard = () => {
  // Sample passenger data
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'John Smith', passport: 'US123456', flight: 'SWA107', 
      destination: 'New York', airline: 'SkyWings Airlines', class: 'Business', status: 'Checked In' },
    { id: 2, name: 'Maria Garcia', passport: 'ES789012', flight: 'OCA204', 
      destination: 'London', airline: 'Ocean Air', class: 'Economy', status: 'Boarding' },
    { id: 3, name: 'Akira Tanaka', passport: 'JP345678', flight: 'SWA422', 
      destination: 'Tokyo', airline: 'SkyWings Airlines', class: 'First', status: 'In Flight' },
    { id: 4, name: 'Sarah Johnson', passport: 'UK901234', flight: 'OCA204', 
      destination: 'London', airline: 'Ocean Air', class: 'Economy', status: 'Booked' },
  ]);

  // State for passenger details view
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  // Handle viewing passenger details
  const handleViewPassengerDetails = (passenger) => {
    setSelectedPassenger(passenger);
    setIsViewingDetails(true);
  };

  // Handle back to passengers list
  const handleBackToPassengers = () => {
    setIsViewingDetails(false);
  };

  // Handle passenger status update
  const handleUpdatePassengerStatus = (id, newStatus) => {
    const updatedPassengers = passengers.map(passenger => 
      passenger.id === id ? { ...passenger, status: newStatus } : passenger
    );
    setPassengers(updatedPassengers);
    
    if (selectedPassenger && selectedPassenger.id === id) {
      setSelectedPassenger({ ...selectedPassenger, status: newStatus });
    }
  };

  // Generate travel history (demo data)
  const generateTravelHistory = (passengerId) => {
    return [
      { date: '2025-03-15', flight: 'SWA422', from: 'New York', to: 'Tokyo', status: 'Completed' },
      { date: '2025-02-10', flight: 'OCA204', from: 'London', to: 'New York', status: 'Completed' },
      { date: '2025-01-05', flight: 'SWA107', from: 'Tokyo', to: 'London', status: 'Completed' },
    ];
  };

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
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {passengers.map(passenger => (
                  <tr key={passenger.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{passenger.id}</td>
                    <td className="py-2 px-4">{passenger.name}</td>
                    <td className="py-2 px-4">{passenger.passport}</td>
                    <td className="py-2 px-4">{passenger.flight}</td>
                    <td className="py-2 px-4">{passenger.destination}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs 
                        ${passenger.class === 'First' ? 'bg-purple-100 text-purple-800' : 
                          passenger.class === 'Business' ? 'bg-indigo-100 text-indigo-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {passenger.class}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs 
                        ${passenger.status === 'Arrived' ? 'bg-green-100 text-green-800' : 
                          passenger.status === 'In Flight' ? 'bg-blue-100 text-blue-800' : 
                          passenger.status === 'Boarding' ? 'bg-yellow-100 text-yellow-800' :
                          passenger.status === 'Checked In' ? 'bg-teal-100 text-teal-800' :
                          passenger.status === 'Booked' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'}`}
                      >
                        {passenger.status}
                      </span>
                    </td>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Passengers List
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Passenger Details</h2>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded text-sm mr-3
                  ${selectedPassenger.status === 'Arrived' ? 'bg-green-100 text-green-800' : 
                    selectedPassenger.status === 'In Flight' ? 'bg-blue-100 text-blue-800' : 
                    selectedPassenger.status === 'Boarding' ? 'bg-yellow-100 text-yellow-800' :
                    selectedPassenger.status === 'Checked In' ? 'bg-teal-100 text-teal-800' :
                    selectedPassenger.status === 'Booked' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'}`}
                >
                  {selectedPassenger.status}
                </span>
                <select
                  className="border border-gray-300 rounded p-1 text-sm"
                  value={selectedPassenger.status}
                  onChange={(e) => handleUpdatePassengerStatus(selectedPassenger.id, e.target.value)}
                >
                  <option value="Booked">Booked</option>
                  <option value="Checked In">Checked In</option>
                  <option value="Boarding">Boarding</option>
                  <option value="In Flight">In Flight</option>
                  <option value="Arrived">Arrived</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
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
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Flight Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Flight Number</p>
                    <p className="font-medium">{selectedPassenger.flight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">{selectedPassenger.airline}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{selectedPassenger.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Class</p>
                    <p className="font-medium">
                      <span className={`px-2 py-1 rounded text-xs 
                        ${selectedPassenger.class === 'First' ? 'bg-purple-100 text-purple-800' : 
                          selectedPassenger.class === 'Business' ? 'bg-indigo-100 text-indigo-800' : 
                          'bg-gray-100 text-gray-800'}`}
                      >
                        {selectedPassenger.class}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Travel History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left border-b">Date</th>
                      <th className="py-2 px-4 text-left border-b">Flight</th>
                      <th className="py-2 px-4 text-left border-b">From</th>
                      <th className="py-2 px-4 text-left border-b">To</th>
                      <th className="py-2 px-4 text-left border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generateTravelHistory(selectedPassenger.id).map((trip, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{trip.date}</td>
                        <td className="py-2 px-4 border-b">{trip.flight}</td>
                        <td className="py-2 px-4 border-b">{trip.from}</td>
                        <td className="py-2 px-4 border-b">{trip.to}</td>
                        <td className="py-2 px-4 border-b">
                          <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            {trip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;