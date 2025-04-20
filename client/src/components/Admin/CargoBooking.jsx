import React, { useState } from 'react';

const CargoBooking = () => {
  // Sample cargo data
  const [cargoBookings, setCargoBookings] = useState([
    { id: 1, trackingNumber: 'CRG001', weight: '2500kg', 
      dimensions: '2.5m x 1.8m x 1.5m', destination: 'New York', 
      airline: 'SkyWings Airlines', status: 'In Transit', 
      shipper: 'Global Logistics', consignee: 'Amazon Inc.' },
    { id: 2, trackingNumber: 'CRG002', weight: '1800kg', 
      dimensions: '3m x 2m x 1m', destination: 'London', 
      airline: 'Ocean Air', status: 'Scheduled',
      shipper: 'DHL Supply Chain', consignee: 'Tesco PLC' },
    { id: 3, trackingNumber: 'CRG003', weight: '3200kg', 
      dimensions: '4m x 2.5m x 2m', destination: 'Tokyo', 
      airline: 'SkyWings Airlines', status: 'Delivered',
      shipper: 'FedEx Logistics', consignee: 'Sony Corporation' },
  ]);

  // State for cargo details view
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isViewingCargoDetails, setIsViewingCargoDetails] = useState(false);

  // Handle viewing cargo details
  const handleViewCargoDetails = (cargo) => {
    setSelectedCargo(cargo);
    setIsViewingCargoDetails(true);
  };

  // Handle back to cargo list
  const handleBackToCargoList = () => {
    setIsViewingCargoDetails(false);
  };

  // Handle cargo status update
  const handleUpdateCargoStatus = (id, newStatus) => {
    const updatedCargo = cargoBookings.map(cargo => 
      cargo.id === id ? { ...cargo, status: newStatus } : cargo
    );
    setCargoBookings(updatedCargo);
    
    if (selectedCargo && selectedCargo.id === id) {
      setSelectedCargo({ ...selectedCargo, status: newStatus });
    }
  };

  // Generate shipment history (demo data)
  const generateShipmentHistory = (cargoId) => {
    return [
      { date: '2025-03-15', location: 'New York Airport', status: 'Customs Cleared' },
      { date: '2025-03-14', location: 'In Transit', status: 'Departed Shanghai' },
      { date: '2025-03-12', location: 'Shanghai Airport', status: 'Processed for Departure' },
      { date: '2025-03-10', location: 'Shanghai Warehouse', status: 'Received for Shipping' },
    ];
  };

  return (
    <div className="container mx-auto py-6 px-6 pb-16">
      {!isViewingCargoDetails ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Cargo Bookings</h2>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="min-w-full bg-white">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Tracking #</th>
                  <th className="py-2 px-4 text-left">Weight</th>
                  <th className="py-2 px-4 text-left">Dimensions</th>
                  <th className="py-2 px-4 text-left">Destination</th>
                  <th className="py-2 px-4 text-left">Airline</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cargoBookings.map(cargo => (
                  <tr key={cargo.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-2 px-4">{cargo.id}</td>
                    <td className="py-2 px-4">{cargo.trackingNumber}</td>
                    <td className="py-2 px-4">{cargo.weight}</td>
                    <td className="py-2 px-4">{cargo.dimensions}</td>
                    <td className="py-2 px-4">{cargo.destination}</td>
                    <td className="py-2 px-4">{cargo.airline}</td>
                    <td className="py-2 px-4">
                      <span className={`px-2 py-1 rounded text-xs 
                        ${cargo.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                          cargo.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                          cargo.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}
                      >
                        {cargo.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <button 
                        onClick={() => handleViewCargoDetails(cargo)}
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
              onClick={handleBackToCargoList}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Cargo List
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Cargo Booking Details</h2>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded text-sm mr-3
                  ${selectedCargo.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                    selectedCargo.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                    selectedCargo.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}
                >
                  {selectedCargo.status}
                </span>
                <select
                  className="border border-gray-300 rounded p-1 text-sm"
                  value={selectedCargo.status}
                  onChange={(e) => handleUpdateCargoStatus(selectedCargo.id, e.target.value)}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Shipment Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-medium">{selectedCargo.trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight</p>
                    <p className="font-medium">{selectedCargo.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dimensions</p>
                    <p className="font-medium">{selectedCargo.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">{selectedCargo.airline}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Parties Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Shipper</p>
                    <p className="font-medium">{selectedCargo.shipper}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Consignee</p>
                    <p className="font-medium">{selectedCargo.consignee}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{selectedCargo.destination}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Shipment History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left border-b">Date</th>
                      <th className="py-2 px-4 text-left border-b">Location</th>
                      <th className="py-2 px-4 text-left border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generateShipmentHistory(selectedCargo.id).map((event, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{event.date}</td>
                        <td className="py-2 px-4 border-b">{event.location}</td>
                        <td className="py-2 px-4 border-b">
                          <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                            {event.status}
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

export default CargoBooking;