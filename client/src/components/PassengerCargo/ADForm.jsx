import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import axios from "../../axiosConfig";

const AcceptanceDeclarationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cargoId = location.state?.cargoId;
  const cargoData = location.state?.formData;
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    // Flight Details
    flightNo: "",
    date: new Date().toISOString().split('T')[0],
    awbNo: "",
    routing: cargoData ? `${cargoData.from} - ${cargoData.to}` : "",
    
    // Shipper Details
    shipper: "",
    telMobile: "",
    cusdecNo: "",
    
    // Loose Cargo
    looseCargoPcs: "",
    looseWeight: cargoData ? cargoData.weight : "",
    looseCbm: "",
    looseContents: cargoData ? cargoData.description : "",
    
    // GOH Details
    gohPcs: "",
    gohWeight: "",
    gohCbm: "",
    gohContents: "",
    
    // Totals
    totalPcs: "",
    totalWeight: cargoData ? cargoData.weight : "",
    totalCbm: "",
    
    // Dimensions
    dimensionsL: "",
    dimensionsW: "",
    dimensionsH: "",
    dimensionsPcs: "",
    
    // Acceptance Pallets - now an array of objects
    acceptancePallets: [
      { palletNo: "", pcs: "" }
    ],
    
    // Loading Details - now an array of objects
    uldBtEntries: [
      { number: "", pcs: "" }
    ],
    
    // Signature details
    nicNumber: "",
    shipperSignature: "",
    loadingDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Redirect if no cargo ID is provided
    if (!cargoId) {
      navigate('/cargo-booking', { 
        state: { message: 'Please create a cargo booking first' }
      });
    }
    
    // Pre-populate form with cargo data if available
    if (cargoData) {
      // Any additional pre-population logic
    }
  }, [cargoId, cargoData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePalletChange = (index, field, value) => {
    const updatedPallets = [...formData.acceptancePallets];
    updatedPallets[index][field] = value;
    setFormData(prev => ({
      ...prev,
      acceptancePallets: updatedPallets
    }));
  };

  const handleUldChange = (index, field, value) => {
    const updatedUlds = [...formData.uldBtEntries];
    updatedUlds[index][field] = value;
    setFormData(prev => ({
      ...prev,
      uldBtEntries: updatedUlds
    }));
  };

  const addPallet = () => {
    if (formData.acceptancePallets.length < 10) {
      setFormData(prev => ({
        ...prev,
        acceptancePallets: [...prev.acceptancePallets, { palletNo: "", pcs: "" }]
      }));
    }
  };

  const removePallet = (index) => {
    if (formData.acceptancePallets.length > 1) {
      const updatedPallets = formData.acceptancePallets.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        acceptancePallets: updatedPallets
      }));
    }
  };

  const addUld = () => {
    if (formData.uldBtEntries.length < 10) {
      setFormData(prev => ({
        ...prev,
        uldBtEntries: [...prev.uldBtEntries, { number: "", pcs: "" }]
      }));
    }
  };

  const removeUld = (index) => {
    if (formData.uldBtEntries.length > 1) {
      const updatedUlds = formData.uldBtEntries.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        uldBtEntries: updatedUlds
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login', { 
          state: { message: 'Please log in to submit the acceptance declaration form' }
        });
        return;
      }
      
      // Submit ADF form data
      const response = await axios.post(`/cargo/${cargoId}/adf`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('ADF submitted successfully:', response.data);
      setSuccess(true);
      
      // Navigate to cargo tracking or confirmation page
      setTimeout(() => {
        navigate('/cargo-tracking', { 
          state: { 
            message: 'Your Acceptance Declaration Form has been submitted successfully',
            cargoId: cargoId 
          }
        });
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting ADF:', err);
      setError(err.response?.data?.message || 'Failed to submit Acceptance Declaration Form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent opacity-30"></div>
      <div className="relative max-w-4xl w-full mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-white to-white"></div>
        
        <div className="p-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 tracking-tight bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              ACCEPTANCE DECLARATION FORM
            </h1>
            <p className="text-sm text-gray-500 mt-2">Shipper's Certification of Shipment Details</p>
            {cargoId && <p className="text-sm text-blue-600 mt-1">Cargo ID: {cargoId}</p>}
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Acceptance Declaration Form submitted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Flight Details Row */}
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">FLIGHT NO</label>
                    <input
                      type="text"
                      name="flightNo"
                      value={formData.flightNo}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AWB NO</label>
                    <input
                      type="text"
                      name="awbNo"
                      value={formData.awbNo}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ROUTING</label>
                    <input
                      type="text"
                      name="routing"
                      value={formData.routing}
                      onChange={handleChange}
                      className="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-300 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Shipper Details Row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">SHIPPER</label>
                  <input
                    type="text"
                    name="shipper"
                    value={formData.shipper}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TEL/MOBILE</label>
                  <input
                    type="text"
                    name="telMobile"
                    value={formData.telMobile}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CUSDEC NO</label>
                  <input
                    type="text"
                    name="cusdecNo"
                    value={formData.cusdecNo}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Loose Cargo Row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LOOSE CARGO PCS</label>
                  <input
                    type="number"
                    name="looseCargoPcs"
                    value={formData.looseCargoPcs}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WEIGHT (kg)</label>
                  <input
                    type="number"
                    name="looseWeight"
                    value={formData.looseWeight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CBM</label>
                  <input
                    type="number"
                    name="looseCbm"
                    value={formData.looseCbm}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CONTENTS</label>
                  <input
                    type="text"
                    name="looseContents"
                    value={formData.looseContents}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* GOH Row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GOH PCS</label>
                  <input
                    type="number"
                    name="gohPcs"
                    value={formData.gohPcs}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WEIGHT (kg)</label>
                  <input
                    type="number"
                    name="gohWeight"
                    value={formData.gohWeight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CBM</label>
                  <input
                    type="number"
                    name="gohCbm"
                    value={formData.gohCbm}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CONTENTS</label>
                  <input
                    type="text"
                    name="gohContents"
                    value={formData.gohContents}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Total Row */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                <div className="flex items-center font-semibold">TOTAL</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                  <input
                    type="number"
                    name="totalPcs"
                    value={formData.totalPcs}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WEIGHT (kg)</label>
                  <input
                    type="number"
                    name="totalWeight"
                    value={formData.totalWeight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CBM</label>
                  <input
                    type="number"
                    name="totalCbm"
                    value={formData.totalCbm}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div></div>
              </div>

              {/* Dimensions Section */}
              <div className="mb-6">
                <p className="font-semibold mb-2">DIMENSIONS (cm)</p>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">L</label>
                    <input
                      type="number"
                      name="dimensionsL"
                      value={formData.dimensionsL}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">W</label>
                    <input
                      type="number"
                      name="dimensionsW"
                      value={formData.dimensionsW}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">H</label>
                    <input
                      type="number"
                      name="dimensionsH"
                      value={formData.dimensionsH}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                    <input
                      type="number"
                      name="dimensionsPcs"
                      value={formData.dimensionsPcs}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                {/* ACCEPTANCE PALLET - MULTIPLE ENTRY */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold">ACCEPTANCE PALLET ENTRIES</p>
                    <button
                      type="button"
                      onClick={addPallet}
                      disabled={formData.acceptancePallets.length >= 10}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                    >
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add Pallet
                    </button>
                  </div>
                  
                  {formData.acceptancePallets.map((pallet, index) => (
                    <div key={`pallet-${index}`} className="grid grid-cols-5 gap-2 mb-2">
                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ACCEPTANCE PALLET NO {index + 1}
                        </label>
                        <input
                          type="text"
                          value={pallet.palletNo}
                          onChange={(e) => handlePalletChange(index, 'palletNo', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                        <input
                          type="number"
                          value={pallet.pcs}
                          onChange={(e) => handlePalletChange(index, 'pcs', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                      </div>
                      <div className="flex items-end mb-1">
                        {formData.acceptancePallets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePallet(index)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500 mt-1">
                    {10 - formData.acceptancePallets.length} more entries available
                  </p>
                </div>
              </div>

              {/* Loading Details Section - MULTIPLE ENTRY */}
              <div className="mb-8 border border-gray-300 rounded p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">LOADING DETAILS</h2>
                  <button
                    type="button"
                    onClick={addUld}
                    disabled={formData.uldBtEntries.length >= 10}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Add ULD/BT
                  </button>
                </div>
                
                {formData.uldBtEntries.map((uld, index) => (
                  <div key={`uld-${index}`} className="grid grid-cols-5 gap-2 mb-2">
                    <div className="col-span-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ULD/BT NUMBER {index + 1}
                      </label>
                      <input
                        type="text"
                        value={uld.number}
                        onChange={(e) => handleUldChange(index, 'number', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                      <input
                        type="number"
                        value={uld.pcs}
                        onChange={(e) => handleUldChange(index, 'pcs', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-end mb-1">
                      {formData.uldBtEntries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeUld(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <p className="text-xs text-gray-500">
                  {10 - formData.uldBtEntries.length} more entries available
                </p>

                <p className="text-sm mt-6 mb-4">
                  Shipper certifies that the particulars on the section 1 hereof are correct and that insofar as any part of the consignment contains DANGEROUS GOODS, such as it is properly described by name and is in proper condition for carriage by air recording to the applicable DANGEROUS GOODS REGULATIONS.
                </p>
                <p className="text-sm mb-6">
                  Shipper / agent bears the responsibility to complete the build-up and record the seating details accurately.
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIC NUMBER</label>
                    <input
                      type="text"
                      name="nicNumber"
                      value={formData.nicNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name OF SHIPPER OR HIS AGENT</label>
                    <input
                      type="text"
                      name="shipperSignature"
                      value={formData.shipperSignature}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">DATE</label>
                    <input
                      type="date"
                      name="loadingDate"
                      value={formData.loadingDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Shipment Details"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceDeclarationForm;