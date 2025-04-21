import React, { useState, useEffect, useRef } from "react";
import axios from "../../axiosConfig";

const AirlineAdminDashboard = () => {
  // State for flights
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    airlineName: "",
    status: "active",
    oneWayPrice: "",
    roundTripPrice: "",
  });
  const [activeTab, setActiveTab] = useState("flights");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch flights from the backend
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/flights");
        if (response.data.success) {
          setFlights(response.data.flights);
        } else {
          console.error("Failed to fetch flights:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // Handle adding a new flight
  const handleAddFlight = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/flights", newFlight);
      if (response.data.success) {
        setFlights([...flights, response.data.flight]);
        setNewFlight({
          from: "",
          to: "",
          departDate: "",
          returnDate: "",
          airlineName: "",
          status: "active",
          oneWayPrice: "",
          roundTripPrice: "",
        });
      } else {
        setError(response.data.message || "Failed to add flight");
      }
    } catch (error) {
      console.error("Error adding flight:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a flight
  const handleEditFlight = async (id) => {
    const flightToEdit = flights.find((flight) => flight._id === id);
    if (!flightToEdit) return;

    const updatedFrom = prompt("Enter new 'From' location:", flightToEdit.from);
    const updatedTo = prompt("Enter new 'To' location:", flightToEdit.to);
    const updatedDepartDate = prompt(
      "Enter new Departure Date (YYYY-MM-DD):",
      flightToEdit.departDate.split("T")[0]
    );
    const updatedReturnDate = prompt(
      "Enter new Return Date (YYYY-MM-DD):",
      flightToEdit.returnDate ? flightToEdit.returnDate.split("T")[0] : ""
    );
    const updatedAirlineName = prompt(
      "Enter new Airline Name:",
      flightToEdit.airlineName
    );
    const updatedStatus = prompt(
      "Enter new Status (active/inactive):",
      flightToEdit.status
    );
    const updatedOneWayPrice = prompt(
      "Enter new One-Way Price:",
      flightToEdit.oneWayPrice
    );
    const updatedRoundTripPrice = prompt(
      "Enter new Round-Trip Price:",
      flightToEdit.roundTripPrice
    );

    try {
      const response = await axios.put(`/flights/${id}`, {
        from: updatedFrom,
        to: updatedTo,
        departDate: updatedDepartDate,
        returnDate: updatedReturnDate || null,
        airlineName: updatedAirlineName,
        status: updatedStatus,
        oneWayPrice: updatedOneWayPrice,
        roundTripPrice: updatedRoundTripPrice,
      });

      if (response.data.success) {
        setFlights((prevFlights) =>
          prevFlights.map((flight) =>
            flight._id === id ? response.data.flight : flight
          )
        );
      } else {
        console.error("Failed to edit flight:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing flight:", error);
    }
  };

  // Handle deleting a flight
  const handleDeleteFlight = async (id) => {
    try {
      const response = await axios.delete(`/flights/${id}`);
      if (response.data.success) {
        setFlights(flights.filter((flight) => flight._id !== id));
      } else {
        console.error("Failed to delete flight:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="container mx-auto py-6 px-6 pb-16">
        {/* Flights Tab */}
        {activeTab === "flights" && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add New Flight</h2>
              <form onSubmit={handleAddFlight}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">From</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.from}
                      onChange={(e) =>
                        setNewFlight({ ...newFlight, from: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">To</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.to}
                      onChange={(e) =>
                        setNewFlight({ ...newFlight, to: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.departDate}
                      onChange={(e) =>
                        setNewFlight({
                          ...newFlight,
                          departDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Return Date</label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.returnDate}
                      onChange={(e) =>
                        setNewFlight({
                          ...newFlight,
                          returnDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Airline Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.airlineName}
                      onChange={(e) =>
                        setNewFlight({
                          ...newFlight,
                          airlineName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Status</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.status}
                      onChange={(e) =>
                        setNewFlight({ ...newFlight, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">One-Way Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.oneWayPrice}
                      onChange={(e) =>
                        setNewFlight({
                          ...newFlight,
                          oneWayPrice: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Round-Trip Price</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newFlight.roundTripPrice}
                      onChange={(e) =>
                        setNewFlight({
                          ...newFlight,
                          roundTripPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Flight"}
                </button>
              </form>
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Flights List</h2>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="min-w-full bg-white">
                  <thead className="sticky top-0 bg-white">
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 text-left">From</th>
                      <th className="py-2 px-4 text-left">To</th>
                      <th className="py-2 px-4 text-left">Departure Date</th>
                      <th className="py-2 px-4 text-left">Return Date</th>
                      <th className="py-2 px-4 text-left">Airline Name</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">One-Way Price</th>
                      <th className="py-2 px-4 text-left">Round-Trip Price</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flights.map((flight) => (
                      <tr key={flight._id} className="border-t border-gray-200">
                        <td className="py-2 px-4">{flight.from}</td>
                        <td className="py-2 px-4">{flight.to}</td>
                        <td className="py-2 px-4">
                          {new Date(flight.departDate).toLocaleDateString()}
                        </td>
                        <td className="py-2 px-4">
                          {flight.returnDate
                            ? new Date(flight.returnDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="py-2 px-4">{flight.airlineName}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              flight.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {flight.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">{flight.oneWayPrice}</td>
                        <td className="py-2 px-4">{flight.roundTripPrice}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleEditFlight(flight._id)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteFlight(flight._id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
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
      </div>
    </div>
  );
};

export default AirlineAdminDashboard;