import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";


function PassengerBooking() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("round"); // 'round' or 'oneway'
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: "1",
    class: "economy",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format dates to include time 00:00:00
    const formattedDepartDate =
      new Date(formData.departDate).toISOString().split("T")[0] + "T00:00:00.000Z";
    const formattedReturnDate = formData.returnDate
      ? new Date(formData.returnDate).toISOString().split("T")[0] + "T00:00:00.000Z"
      : null;

    try {
      // Fetch flight data
      const response = await axios.get("/flights/searchRoundTripFlights", {
        params: {
          from: formData.from,
          to: formData.to,
          departDate: formattedDepartDate,
          returnDate: formattedReturnDate,
        },
      });

      console.log("Flights Data:", response.data);

      // Navigate to departure-flight page and pass the flight data
      navigate("/departure-flight", {
        state: {
          flights: response.data.flights, // Pass the fetched flights
          tripType: tripType, // Pass the trip type
        },
      });
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    // Reset return date when changing trip type
    if (type === "oneway") {
      setFormData((prev) => ({ ...prev, returnDate: "" }));
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-wrapper">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Plan Your Journey
        </h1>
        <p className="booking-subtitle">
          Find the perfect flight for your next adventure
        </p>

        <div className="booking-card">
          <form onSubmit={handleSubmit} className="booking-form">
            {/* Trip Type Selector */}
            <div className="trip-type-selector">
              <button
                type="button"
                className={`trip-type-btn ${tripType === "round" ? "active" : ""}`}
                onClick={() => handleTripTypeChange("round")}
              >
                Round Trip
              </button>
              <button
                type="button"
                className={`trip-type-btn ${tripType === "oneway" ? "active" : ""}`}
                onClick={() => handleTripTypeChange("oneway")}
              >
                One Way
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">From</label>
                <div className="input-group">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Departure City"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">To</label>
                <div className="input-group">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Arrival City"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Depart Date</label>
                <div className="input-group">
                  <Calendar className="input-icon" />
                  <input
                    type="date"
                    name="departDate"
                    value={formData.departDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Return Date</label>
                <div className="input-group">
                  <Calendar className="input-icon" />
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    className="form-input"
                    disabled={tripType === "oneway"}
                    required={tripType === "round"}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Passengers</label>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="form-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} Passenger{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Class</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Search Flights
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .booking-container {
          max-width: 100%;
          min-height: 100vh;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #ffffff 100%);
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .booking-wrapper {
          max-width: 56rem;
          margin: 0 auto;
          animation: fadeIn 0.6s ease-out;
        }

        .booking-title {
          font-size: 2.5rem;
          font-weight: 800;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #2d3748;
          background: linear-gradient(to right, #1e40af, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .booking-subtitle {
          text-align: center;
          color: #1e3a8a;
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
        }

        .booking-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.2),
            0 10px 10px -5px rgba(37, 99, 235, 0.1);
          padding: 2.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .booking-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.2),
            0 10px 10px -5px rgba(37, 99, 235, 0.1);
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .trip-type-selector {
          display: flex;
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          margin-bottom: 0.5rem;
        }

        .trip-type-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          background: white;
          cursor: pointer;
          font-weight: 600;
          color: #1e3a8a;
          transition: all 0.2s ease;
        }

        .trip-type-btn.active {
          background: #3b82f6;
          color: white;
        }

        .trip-type-btn:first-child {
          border-right: 1px solid #e2e8f0;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 0.5rem;
        }

        .input-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          color: #3b82f6;
          height: 1.25rem;
          width: 1.25rem;
        }

        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          border-radius: 0.5rem;
          border: 1px solid #bfdbfe;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: #1e3a8a;
          height: 2.75rem;
        }

        .form-input:disabled {
          background-color: #f0f7ff;
          color: #93c5fd;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .form-select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #bfdbfe;
          font-size: 1rem;
          transition: all 0.2s ease;
          color: #1e3a8a;
          height: 2.75rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%233b82f6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.5rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }

        .form-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(to right, #1e40af, #3b82f6);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .submit-button:hover {
          background: linear-gradient(to right, #1e3a8a, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2),
            0 2px 4px -1px rgba(37, 99, 235, 0.1);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .booking-card {
            padding: 1.5rem;
          }

          .booking-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}

export default PassengerBooking;