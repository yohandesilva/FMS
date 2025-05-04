import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const ADFDetailsPage = () => {
  const { cargoId } = useParams(); // Get cargoId from URL
  const navigate = useNavigate();
  const [adfData, setAdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch ADF details (similar to the one in CargoBooking)
  const fetchADFDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`/cargo/${id}/adf`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setAdfData(response.data.adf);
      } else {
        setError('No ADF found for this cargo or failed to fetch.');
        setAdfData(null);
      }
    } catch (err) {
      console.error('Error fetching ADF details:', err);
      if (err.response && err.response.status === 404) {
        setError('No Acceptance Declaration Form found for this cargo.');
      } else {
        setError('An error occurred while fetching ADF details.');
      }
      setAdfData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ADF details when the component mounts or cargoId changes
  useEffect(() => {
    if (cargoId) {
      fetchADFDetails(cargoId);
    } else {
      setError("Cargo ID is missing.");
      setLoading(false);
    }
  }, [cargoId]);

  // Helper function for date formatting (copied from CargoBooking)
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

  // Handle back navigation
  const handleBack = () => {
    // Navigate back to the specific cargo details page or the list
    // You might want to adjust this based on your desired flow
    navigate(`/admin/cargo-booking-details`); // Or navigate(-1) to go back one step
  };

  return (
    <div className="container mx-auto py-6 px-6 pb-16">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin h-8 w-8 text-indigo-600" />
          <span className="ml-2">Loading ADF details...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && adfData && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Acceptance Declaration Form</h2>

          {/* Flight Information */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Flight Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Flight Number</p>
                <p className="font-medium">{adfData.flightNo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(adfData.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">AWB Number</p>
                <p className="font-medium">{adfData.awbNo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Routing</p>
                <p className="font-medium">{adfData.routing || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Shipper Information */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Shipper Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Shipper Name</p>
                <p className="font-medium">{adfData.shipper || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Number</p>
                <p className="font-medium">{adfData.telMobile || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">CUSDEC Number</p>
                <p className="font-medium">{adfData.cusdecNo || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">NIC Number</p>
                <p className="font-medium">{adfData.nicNumber || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Dimensions */}
          <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Dimensions</h3>
              <div className="flex space-x-6">
                  <div>
                      <p className="text-sm text-gray-500">Length</p>
                      <p className="font-medium text-lg">{adfData.dimensions?.L ? `${adfData.dimensions.L} cm` : 'N/A'}</p>
                  </div>
                  <div>
                      <p className="text-sm text-gray-500">Width</p>
                      <p className="font-medium text-lg">{adfData.dimensions?.W ? `${adfData.dimensions.W} cm` : 'N/A'}</p>
                  </div>
                  <div>
                      <p className="text-sm text-gray-500">Height</p>
                      <p className="font-medium text-lg">{adfData.dimensions?.H ? `${adfData.dimensions.H} cm` : 'N/A'}</p>
                  </div>
                  <div>
                      <p className="text-sm text-gray-500">Pieces</p>
                      <p className="font-medium text-lg">{adfData.dimensions?.pcs || 'N/A'}</p>
                  </div>
              </div>
          </div>


          {/* Cargo Details */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">Cargo Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Total Pieces</p>
                <p className="font-medium text-lg">{adfData.totalPcs || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Weight (kg)</p>
                <p className="font-medium text-lg">{adfData.totalWeight || '0'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Volume (CBM)</p>
                <p className="font-medium text-lg">{adfData.totalCbm || '0'}</p>
              </div>
            </div>

            {/* Loose Cargo */}
            {adfData.looseCargoPcs > 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2 text-gray-700">Loose Cargo</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pieces</p>
                    <p className="font-medium">{adfData.looseCargoPcs || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight (kg)</p>
                    <p className="font-medium">{adfData.looseWeight || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volume (CBM)</p>
                    <p className="font-medium">{adfData.looseCbm || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contents</p>
                    <p className="font-medium">{adfData.looseContents || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* GOH Cargo */}
            {adfData.gohPcs > 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded">
                <h4 className="font-semibold mb-2 text-gray-700">Garment on Hanger (GOH)</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Pieces</p>
                    <p className="font-medium">{adfData.gohPcs || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Weight (kg)</p>
                    <p className="font-medium">{adfData.gohWeight || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volume (CBM)</p>
                    <p className="font-medium">{adfData.gohCbm || '0'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contents</p>
                    <p className="font-medium">{adfData.gohContents || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Acceptance Pallets */}
          {adfData.acceptancePallets && Array.isArray(adfData.acceptancePallets) && adfData.acceptancePallets.length > 0 ? (
            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">Acceptance Pallets</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left border-b">Pallet No</th>
                      <th className="py-2 px-4 text-left border-b">Pieces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adfData.acceptancePallets.map((pallet, index) => (
                      <tr key={`pallet-${index}`} className="border-t">
                        <td className="py-2 px-4">{pallet.palletNo || 'N/A'}</td>
                        <td className="py-2 px-4">{pallet.pcs || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">No pallet information available</p>
          )}


          {/* ULD/BT Entries */}
          {adfData.uldBtEntries && Array.isArray(adfData.uldBtEntries) && adfData.uldBtEntries.length > 0 ? (
            <div className="mb-6 border-b pb-4">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">ULD/BT Entries</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left border-b">ULD/BT Number</th>
                      <th className="py-2 px-4 text-left border-b">Pieces</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adfData.uldBtEntries.map((uld, index) => (
                      <tr key={`uld-${index}`} className="border-t">
                        <td className="py-2 px-4">{uld.number || 'N/A'}</td>
                        <td className="py-2 px-4">{uld.pcs || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 mb-6">No ULD/BT information available</p>
          )}


          {/* Signatures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Shipper Signature</p>
              <p className="font-medium">{adfData.shipperSignature || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Loading Date</p>
              <p className="font-medium">{formatDate(adfData.loadingDate)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ADFDetailsPage;