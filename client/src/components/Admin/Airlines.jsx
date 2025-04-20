import React, { useState, useEffect, useRef } from 'react';

const AirlineAdminDashboard = () => {
  // State for airlines and cargo
  const [airlines, setAirlines] = useState([
    { id: 1, name: 'SkyWings Airlines', code: 'SWA', status: 'Active', fleetSize: 42 },
    { id: 2, name: 'Ocean Air', code: 'OCA', status: 'Active', fleetSize: 28 },
    { id: 3, name: 'Golden Eagle', code: 'GEA', status: 'Inactive', fleetSize: 15 },
  ]);
  
  const [cargo, setCargo] = useState([
    { id: 1, trackingNumber: 'CRG001', weight: '2500kg', destination: 'New York', airline: 'SkyWings Airlines', status: 'In Transit' },
    { id: 2, trackingNumber: 'CRG002', weight: '1800kg', destination: 'London', airline: 'Ocean Air', status: 'Scheduled' },
    { id: 3, trackingNumber: 'CRG003', weight: '3200kg', destination: 'Tokyo', airline: 'SkyWings Airlines', status: 'Delivered' },
  ]);

  // State for form inputs
  const [activeTab, setActiveTab] = useState('airlines');
  const [newAirline, setNewAirline] = useState({ name: '', code: '', status: 'Active', fleetSize: 0 });
  const [newCargo, setNewCargo] = useState({ trackingNumber: '', weight: '', destination: '', airline: '', status: 'Scheduled' });
  
  // Scroll state
  const [scrollPosition, setScrollPosition] = useState(0);
  const dashboardRef = useRef(null);

  // Handle scroll event
  const handleScroll = () => {
    if (dashboardRef.current) {
      setScrollPosition(dashboardRef.current.scrollTop);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (dashboard) {
      dashboard.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (dashboard) {
        dashboard.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Handle adding new airline
  const handleAddAirline = (e) => {
    e.preventDefault();
    const id = airlines.length > 0 ? Math.max(...airlines.map(a => a.id)) + 1 : 1;
    setAirlines([...airlines, { ...newAirline, id }]);
    setNewAirline({ name: '', code: '', status: 'Active', fleetSize: 0 });
  };

  // Handle adding new cargo
  const handleAddCargo = (e) => {
    e.preventDefault();
    const id = cargo.length > 0 ? Math.max(...cargo.map(c => c.id)) + 1 : 1;
    setCargo([...cargo, { ...newCargo, id }]);
    setNewCargo({ trackingNumber: '', weight: '', destination: '', airline: '', status: 'Scheduled' });
  };

  // Handle removing airline
  const handleRemoveAirline = (id) => {
    setAirlines(airlines.filter(airline => airline.id !== id));
  };

  // Handle removing cargo
  const handleRemoveCargo = (id) => {
    setCargo(cargo.filter(item => item.id !== id));
  };

  return (
    <div 
      ref={dashboardRef}
      className="h-screen overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
    >
      <div className="container mx-auto py-6 px-6 pb-16">
        {/* Fixed header with tabs */}
        <div className="sticky top-0 bg-white shadow-md p-4 z-10 mb-6 rounded-lg">
          <div className="flex border-b border-gray-300">
            <button 
              className={`py-2 px-4 mr-2 ${activeTab === 'airlines' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('airlines')}
            >
              Airlines
            </button>
            <button 
              className={`py-2 px-4 ${activeTab === 'cargo' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('cargo')}
            >
              Cargo
            </button>
          </div>
        </div>

        {/* Airlines Tab */}
        {activeTab === 'airlines' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Airline</h2>
              <form onSubmit={handleAddAirline}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Airline Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newAirline.name}
                      onChange={(e) => setNewAirline({...newAirline, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Airline Code</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newAirline.code}
                      onChange={(e) => setNewAirline({...newAirline, code: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newAirline.status}
                      onChange={(e) => setNewAirline({...newAirline, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Fleet Size</label>
                    <input 
                      type="number" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newAirline.fleetSize}
                      onChange={(e) => setNewAirline({...newAirline, fleetSize: parseInt(e.target.value) || 0})}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Add Airline
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Airlines List</h2>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead className="sticky top-0 bg-white">
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Name</th>
                      <th className="py-2 px-4 text-left">Code</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Fleet Size</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {airlines.map(airline => (
                      <tr key={airline.id} className="border-t border-gray-200">
                        <td className="py-2 px-4">{airline.id}</td>
                        <td className="py-2 px-4">{airline.name}</td>
                        <td className="py-2 px-4">{airline.code}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${airline.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {airline.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">{airline.fleetSize}</td>
                        <td className="py-2 px-4">
                          <button 
                            onClick={() => handleRemoveAirline(airline.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Cargo Tab */}
        {activeTab === 'cargo' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Cargo</h2>
              <form onSubmit={handleAddCargo}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Tracking Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newCargo.trackingNumber}
                      onChange={(e) => setNewCargo({...newCargo, trackingNumber: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Weight</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newCargo.weight}
                      onChange={(e) => setNewCargo({...newCargo, weight: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Destination</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newCargo.destination}
                      onChange={(e) => setNewCargo({...newCargo, destination: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Airline</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newCargo.airline}
                      onChange={(e) => setNewCargo({...newCargo, airline: e.target.value})}
                      required
                    >
                      <option value="">Select Airline</option>
                      {airlines.filter(a => a.status === 'Active').map(airline => (
                        <option key={airline.id} value={airline.name}>{airline.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newCargo.status}
                      onChange={(e) => setNewCargo({...newCargo, status: e.target.value})}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Add Cargo
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Cargo List</h2>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead className="sticky top-0 bg-white">
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">ID</th>
                      <th className="py-2 px-4 text-left">Tracking Number</th>
                      <th className="py-2 px-4 text-left">Weight</th>
                      <th className="py-2 px-4 text-left">Destination</th>
                      <th className="py-2 px-4 text-left">Airline</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cargo.map(item => (
                      <tr key={item.id} className="border-t border-gray-200">
                        <td className="py-2 px-4">{item.id}</td>
                        <td className="py-2 px-4">{item.trackingNumber}</td>
                        <td className="py-2 px-4">{item.weight}</td>
                        <td className="py-2 px-4">{item.destination}</td>
                        <td className="py-2 px-4">{item.airline}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded text-xs 
                            ${item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              item.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                              item.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <button 
                            onClick={() => handleRemoveCargo(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Scroll to top button - appears when scrolled down */}
        {scrollPosition > 300 && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 z-20"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AirlineAdminDashboard;