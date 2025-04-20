import React, { useState } from "react";

const AcceptanceDeclarationForm = () => {
  const [formData, setFormData] = useState({
    // Flight Details
    flightNo: "",
    date: "",
    awbNo: "",
    routing: "",
    
    // Shipper Details
    shipper: "",
    telMobile: "",
    cusdecNo: "",
    
    // Loose Cargo
    looseCargoPcs: "",
    looseWeight: "",
    looseCbm: "",
    looseContents: "",
    
    // GOH Details
    gohPcs: "",
    gohWeight: "",
    gohCbm: "",
    gohContents: "",
    
    // Totals
    totalPcs: "",
    totalWeight: "",
    totalCbm: "",
    
    // Dimensions
    dimensions1L: "",
    dimensions1W: "",
    dimensions1H: "",
    dimensions1Pcs: "",
    dimensions2L: "",
    dimensions2W: "",
    dimensions2H: "",
    dimensions2Pcs: "",
    
    // Acceptance Pallets
    acceptancePalletNo1: "",
    acceptancePalletPcs1: "",
    acceptancePalletNo2: "",
    acceptancePalletPcs2: "",
    
    // Loading Details
    uldBtNumber1: "",
    uldPcs1: "",
    uldBtNumber2: "",
    uldPcs2: "",
    nicNumber: "",
    shipperSignature: "",
    loadingDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submission logic here
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
          </div>

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

              {/* Rest of the form remains the same as previous implementation */}
              {/* ... (previous form sections) ... */}
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
            <div className="grid grid-cols-8 gap-2 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">L</label>
                <input
                  type="number"
                  name="dimensions1L"
                  value={formData.dimensions1L}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">W</label>
                <input
                  type="number"
                  name="dimensions1W"
                  value={formData.dimensions1W}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">H</label>
                <input
                  type="number"
                  name="dimensions1H"
                  value={formData.dimensions1H}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="dimensions1Pcs"
                  value={formData.dimensions1Pcs}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">L</label>
                <input
                  type="number"
                  name="dimensions2L"
                  value={formData.dimensions2L}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">W</label>
                <input
                  type="number"
                  name="dimensions2W"
                  value={formData.dimensions2W}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">H</label>
                <input
                  type="number"
                  name="dimensions2H"
                  value={formData.dimensions2H}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="dimensions2Pcs"
                  value={formData.dimensions2Pcs}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ACCEPTANCE PALLET NO</label>
                <input
                  type="text"
                  name="acceptancePalletNo1"
                  value={formData.acceptancePalletNo1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="acceptancePalletPcs1"
                  value={formData.acceptancePalletPcs1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ACCEPTANCE PALLET NO</label>
                <input
                  type="text"
                  name="acceptancePalletNo2"
                  value={formData.acceptancePalletNo2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="acceptancePalletPcs2"
                  value={formData.acceptancePalletPcs2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          {/* Loading Details Section */}
          <div className="mb-8 border border-gray-300 rounded p-4">
            <h2 className="text-lg font-semibold mb-4">LOADING DETAILS</h2>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ULD/BT NUMBER</label>
                <input
                  type="text"
                  name="uldBtNumber1"
                  value={formData.uldBtNumber1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="uldPcs1"
                  value={formData.uldPcs1}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ULD/BT NUMBER</label>
                <input
                  type="text"
                  name="uldBtNumber2"
                  value={formData.uldBtNumber2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PCS</label>
                <input
                  type="number"
                  name="uldPcs2"
                  value={formData.uldPcs2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <p className="text-sm mb-4">
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
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Submit Shipment Details
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