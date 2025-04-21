import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const BookSeat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight_id, passenger_id, flightPrice, tripType } = location.state; // Get flightPrice and tripType

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    // Fetch seat data for the flight
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/seats/${flight_id}`);
        setSeats(response.data.seats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [flight_id]);

  const handleSeatSelect = async (row, seat) => {
    const seatKey = `${row}${seat}`;
    const seatPrice = ["A", "K"].includes(seat) ? 40 : ["C", "H"].includes(seat) ? 25 : 0;

    // Check if the passenger has already selected a seat
    if (selectedSeat) {
      alert("You can only select one seat for this flight.");
      return;
    }

    // Check if the seat is already selected
    const existingSeat = seats.find((s) => s.seatNumber === seatKey);
    if (existingSeat) {
      alert("This seat is unavailable.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/seats/select", {
        flight_id,
        seatNumber: seatKey,
        passenger_id,
        price: seatPrice,
      });

      if (response.data.success) {
        alert("Seat selected successfully!");
        setSelectedSeat(seatKey);
        setSeats((prevSeats) => [
          ...prevSeats,
          { seatNumber: seatKey, passenger_id, price: seatPrice },
        ]);
      }
    } catch (error) {
      console.error("Error selecting seat:", error);
      alert(error.response?.data?.message || "Failed to select seat. Please try again.");
    }
  };

  const handleConfirm = () => {
    if (!selectedSeat) {
      alert("Please select a seat before confirming.");
      return;
    }

    const seatData = seats.find((s) => s.seatNumber === selectedSeat);
    const seatFee = seatData?.price || 0; // Get the seat fee

    // Redirect to PaymentMethods.jsx with necessary data
    navigate("/payment-methods", {
      state: {
        selectedSeat,
        flight_id,
        passenger_id,
        flightPrice, // Pass the flight price
        seatFee, // Pass the seat fee
      },
    });
  };

  const renderSeat = (row, seat) => {
    const seatKey = `${row}${seat}`;
    const seatData = seats.find((s) => s.seatNumber === seatKey);
    const isUnavailable = !!seatData; // Seat is unavailable if it exists in the database
    const isSelected = selectedSeat === seatKey;

    const seatClasses = {
      available: "bg-green-400 hover:bg-green-500",
      "chargeable-high": "bg-purple-500 hover:bg-purple-600",
      "chargeable-low": "bg-indigo-500 hover:bg-indigo-600",
      unavailable: "bg-gray-300 cursor-not-allowed",
    };

    const status = isUnavailable
      ? "unavailable"
      : ["A", "K"].includes(seat)
      ? "chargeable-high"
      : ["C", "H"].includes(seat)
      ? "chargeable-low"
      : "available";

    return (
      <div
        key={seatKey}
        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white ${
          isSelected ? "bg-blue-500" : seatClasses[status]
        }`}
        onClick={() => !isUnavailable && !selectedSeat && handleSeatSelect(row, seat)}
      >
        {seat}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <form className="bg-white shadow-lg rounded-xl p-6 w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">FLIGHTEASE</h1>
        </div>

        <div className="flex space-x-4">
          {/* Seat Map */}
          <div className="flex-grow">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((row) => (
              <div key={row} className="flex items-center mb-2">
                <div className="w-10 text-right mr-4 text-gray-500">{row}</div>
                <div className="flex">
                  <div className="flex space-x-1 mr-4">
                    {["A", "B", "C"].map((seat) => renderSeat(row, seat))}
                  </div>
                  <div className="w-8"></div>
                  <div className="flex space-x-1">
                    {["H", "J", "K"].map((seat) => renderSeat(row, seat))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend and Selected Seats */}
          <div className="w-64 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Seat Legend</h3>
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 mr-3 rounded bg-green-400"></div>
                <span className="text-blue">Available (No Extra Charge)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 mr-3 rounded bg-purple-500"></div>
                <span className="text-blue">Chargeable Seat ($ 40)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 mr-3 rounded bg-indigo-500"></div>
                <span className="text-blue">Chargeable Seat ($ 25)</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 mr-3 rounded bg-gray-300"></div>
                <span className="text-blue">Not Available</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Selected Seat</h2>
              {selectedSeat ? (
                <p className="text-gray-800 font-bold">{selectedSeat}</p>
              ) : (
                <p className="text-gray-500">No seat selected</p>
              )}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Confirm and Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookSeat;