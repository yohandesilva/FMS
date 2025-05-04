import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const BookSeat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight_id, passenger_id, flightPrice, tripType } = location.state || {};

  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  useEffect(() => {
    if (!flight_id || !passenger_id) {
      console.error("Missing flight_id or passenger_id in BookSeat component state:", location.state);
      alert("Required booking information is missing. Please start the booking process again.");
      navigate("/");
      return;
    }

    const fetchSeats = async () => {
      try {
        const response = await axios.get(`/seats/${flight_id}`);
        setSeats(response.data.seats || []);
      } catch (error) {
        console.error("Error fetching seats:", error.response?.data || error.message);
      }
    };

    fetchSeats();
  }, [flight_id, passenger_id, navigate, location.state]);

  const handleSeatSelect = async (row, seat) => {
    const seatKey = `${row}${seat}`;
    const seatPrice = ["A", "K"].includes(seat) ? 40 : ["C", "H"].includes(seat) ? 25 : 0;

    if (selectedSeat) {
      alert("You have already selected a seat. To change, please refresh or go back (Note: This might lose current selection).");
      return;
    }

    const existingSeat = seats.find((s) => s.seatNumber === seatKey);
    if (existingSeat) {
      alert("This seat is unavailable.");
      return;
    }

    if (!passenger_id) {
      alert("Passenger information is missing. Cannot select seat.");
      return;
    }

    try {
      const response = await axios.post("/seats/select", {
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
      } else {
        alert(response.data.message || "Failed to select seat. Please try again.");
      }
    } catch (error) {
      console.error("Error selecting seat:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while selecting the seat.");
    }
  };

  const handleConfirm = () => {
    if (!selectedSeat) {
      alert("Please select a seat before confirming.");
      return;
    }

    const seatPrice = ["A", "K"].includes(selectedSeat.slice(-1)) ? 40 : ["C", "H"].includes(selectedSeat.slice(-1)) ? 25 : 0;
    const seatFee = seatPrice;

    const validFlightPrice = typeof flightPrice === "number" ? flightPrice : 0;

    console.log("Navigating to PaymentMethods with state:", {
      selectedSeat,
      flight_id,
      passenger_id,
      flightPrice: validFlightPrice,
      seatFee,
      tripType,
    });

    navigate("/payment-methods", {
      state: {
        selectedSeat,
        flight_id,
        passenger_id,
        flightPrice: validFlightPrice,
        seatFee,
        tripType,
      },
    });
  };

  const renderSeat = (row, seat) => {
    const seatKey = `${row}${seat}`;
    const seatData = seats.find((s) => s.seatNumber === seatKey);
    const isUnavailable = !!seatData;
    const isSelectedByCurrentUser = selectedSeat === seatKey;

    const seatClasses = {
      available: "bg-green-400 hover:bg-green-500 cursor-pointer",
      "chargeable-high": "bg-purple-500 hover:bg-purple-600 cursor-pointer",
      "chargeable-low": "bg-indigo-500 hover:bg-indigo-600 cursor-pointer",
      unavailable: "bg-gray-300 cursor-not-allowed",
      selected: "bg-blue-500 ring-2 ring-offset-1 ring-blue-700",
    };

    let status;
    if (isSelectedByCurrentUser) {
      status = "selected";
    } else if (isUnavailable) {
      status = "unavailable";
    } else if (["A", "K"].includes(seat)) {
      status = "chargeable-high";
    } else if (["C", "H"].includes(seat)) {
      status = "chargeable-low";
    } else {
      status = "available";
    }

    const canClick = !isUnavailable && !selectedSeat;

    return (
      <div
        key={seatKey}
        className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold text-white transition-colors duration-150 ${seatClasses[status]} ${canClick ? "" : "opacity-75"}`}
        onClick={() => canClick && handleSeatSelect(row, seat)}
        title={isUnavailable ? `Seat ${seatKey} (Unavailable)` : `Seat ${seatKey}`}
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