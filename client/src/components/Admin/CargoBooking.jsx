import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { ArrowLeft, RefreshCw, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CargoBooking = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State for cargo data
  const [cargoBookings, setCargoBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for cargo details view
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [isViewingCargoDetails, setIsViewingCargoDetails] = useState(false);

  // Fetch all cargo bookings on component mount
  useEffect(() => {
    fetchCargoBookings();
  }, []);

  // Function to fetch all cargo bookings
  const fetchCargoBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/cargo', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setCargoBookings(response.data.cargoBookings);
      } else {
        setError('Failed to fetch cargo bookings');
      }
    } catch (err) {
      console.error('Error fetching cargo bookings:', err);
      setError('An error occurred while fetching cargo bookings');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch cargo details by ID
  const fetchCargoDetails = async (id) => {
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/cargo/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSelectedCargo(response.data.cargo);
        setIsViewingCargoDetails(true);
      } else {
        setError('Failed to fetch cargo details');
        setSelectedCargo(null);
        setIsViewingCargoDetails(false);
      }
    } catch (err) {
      console.error('Error fetching cargo details:', err);
      setError('An error occurred while fetching cargo details');
      setSelectedCargo(null);
      setIsViewingCargoDetails(false);
    }
  };

  // Handle viewing cargo details
  const handleViewCargoDetails = (cargoId) => {
    fetchCargoDetails(cargoId);
  };

  // Handle back to cargo list
  const handleBackToCargoList = () => {
    setIsViewingCargoDetails(false);
    setSelectedCargo(null);
    setError(null); // Clear errors when going back
  };

  // Navigate to ADF details page
  const handleViewADFPage = () => {
    if (selectedCargo && selectedCargo._id) {
      console.log("DEBUG: Navigating to ADF details page for cargo:", selectedCargo._id);
      navigate(`/admin/cargo/${selectedCargo._id}/adf-details`);
    } else {
      console.error("DEBUG: Cannot navigate, selectedCargo or _id is missing");
      setError("Cannot view ADF details, cargo information is missing.");
    }
  };

  // Handle cargo status update
  const handleUpdateCargoStatus = async (id, field, value) => {
    try {
      const token = localStorage.getItem('adminToken');
      const updateData = { [field]: value };

      const response = await axios.patch(`/cargo/${id}/status`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        // Update local state
        if (selectedCargo && selectedCargo._id === id) {
          setSelectedCargo(prev => ({ ...prev, [field]: value }));
        }

        // Update the cargo bookings list
        setCargoBookings(prevBookings =>
          prevBookings.map(cargo =>
            cargo._id === id ? { ...cargo, [field]: value } : cargo
          )
        );
      } else {
        setError('Failed to update cargo status');
      }
    } catch (err) {
      console.error('Error updating cargo status:', err);
      setError('An error occurred while updating cargo status');
    }
  };

  // Handle sending email using mailto:
  const handleSendEmail = (email) => {
    if (email) {
      const subject = `Regarding your Cargo Booking: ${selectedCargo?.trackingNumber || ''}`;
      const body = `Dear Customer,\n\nPlease find details regarding your cargo booking...\n\nTracking Number: ${selectedCargo?.trackingNumber || 'N/A'}\nStatus: ${selectedCargo?.status || 'N/A'}\n\nBest regards,\nFlightEase Admin`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      setError("Customer email address is not available.");
    }
  };

  // Generate a formatted date - add safety check
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return 'Date Error';
    }
  };

  // Status badge styling helper
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-indigo-100 text-indigo-800';
      case 'requested':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Payment status badge styling helper
  const getPaymentStatusBadgeClass = (status) => {
    switch(status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6 px-6 pb-16">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="font-bold text-lg leading-none">&times;</button>
        </div>
      )}

      {/* Loading state */}
      {loading && !isViewingCargoDetails && (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin h-8 w-8 text-indigo-600" />
          <span className="ml-2">Loading cargo bookings...</span>
        </div>
      )}

      {/* Main content: List View */}
      {!loading && !isViewingCargoDetails ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cargo Bookings</h2>
            <button
              onClick={fetchCargoBookings}
              className="bg-indigo-50 p-2 rounded hover:bg-indigo-100"
              disabled={loading}
              title="Refresh Bookings"
            >
              <RefreshCw className={`h-5 w-5 text-indigo-600 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          {cargoBookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No cargo bookings found
            </div>
          ) : (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="min-w-full bg-white">
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Tracking #</th>
                    <th className="py-2 px-4 text-left">From</th>
                    <th className="py-2 px-4 text-left">To</th>
                    <th className="py-2 px-4 text-left">Weight</th>
                    <th className="py-2 px-4 text-left">Type</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Payment</th>
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cargoBookings.map(cargo => (
                    <tr key={cargo._id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-2 px-4">{cargo.trackingNumber}</td>
                      <td className="py-2 px-4">{cargo.from}</td>
                      <td className="py-2 px-4">{cargo.to}</td>
                      <td className="py-2 px-4">{cargo.weight} kg</td>
                      <td className="py-2 px-4">{cargo.type}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusBadgeClass(cargo.status)}`}>
                          {cargo.status}
                        </span>
                      </td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${getPaymentStatusBadgeClass(cargo.paymentStatus)}`}>
                          {cargo.paymentStatus}
                        </span>
                      </td>
                      <td className="py-2 px-4">{formatDate(cargo.createdAt)}</td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => handleViewCargoDetails(cargo._id)}
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
          )}
        </div>
      ) : (
        // Cargo Details View
        selectedCargo && (
          <div>
            <div className="mb-4">
              <button
                onClick={handleBackToCargoList}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Cargo List
              </button>
            </div>
            {/* Cargo Details Box */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Cargo Booking Details</h2>
                <div className="flex items-center space-x-2">
                  {/* Status Badge */}
                  <span className={`px-3 py-1 rounded text-sm ${getStatusBadgeClass(selectedCargo.status)}`}>
                    {selectedCargo.status}
                  </span>

                  {/* Status Update Dropdown */}
                  <select
                    className="border border-gray-300 rounded p-1 text-sm"
                    value={selectedCargo.status}
                    onChange={(e) => handleUpdateCargoStatus(selectedCargo._id, 'status', e.target.value)}
                  >
                    <option value="requested">Requested</option>
                    <option value="accepted">Accepted</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Payment Status Update Dropdown */}
                  <select
                    className="border border-gray-300 rounded p-1 text-sm ml-2"
                    value={selectedCargo.paymentStatus}
                    onChange={(e) => handleUpdateCargoStatus(selectedCargo._id, 'paymentStatus', e.target.value)}
                  >
                    <option value="pending">Payment Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Shipment Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Shipment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="font-medium">{selectedCargo.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium">{selectedCargo.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dimensions</p>
                      <p className="font-medium">{selectedCargo.dimensions || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium capitalize">{selectedCargo.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Shipping Date</p>
                      <p className="font-medium">{formatDate(selectedCargo.date)}</p>
                    </div>
                  </div>
                </div>
                {/* Route Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Route Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">From</p>
                      <p className="font-medium">{selectedCargo.from}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">To</p>
                      <p className="font-medium">{selectedCargo.to}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-medium">
                        {selectedCargo.userId ?
                          `${selectedCargo.userId.firstName} ${selectedCargo.userId.lastName}` :
                          'Not assigned'}
                      </p>
                    </div>
                    {/* Customer Email with Send Button */}
                    <div>
                      <p className="text-sm text-gray-500">Customer Email</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{selectedCargo.userId?.email || 'N/A'}</p>
                        {selectedCargo.userId?.email && (
                          <button
                            onClick={() => handleSendEmail(selectedCargo.userId.email)}
                            className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                            title={`Send email to ${selectedCargo.userId.email}`}
                          >
                            <Mail size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="font-medium">{selectedCargo.description || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADF Button - Updated */}
              <div className="border-t pt-4">
                 <button
                    onClick={handleViewADFPage} // Use the updated handler
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    disabled={!selectedCargo} // Disable if no cargo selected
                  >
                    View ADF Details Page {/* Updated Button Text */}
                  </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CargoBooking;