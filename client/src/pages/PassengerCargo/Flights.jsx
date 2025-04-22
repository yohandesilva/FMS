import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PassengerBooking from '../../components/PassengerCargo/PassengerBooking';

function Flights() {
  const [tripType, setTripType] = useState(null);
  const [departureFlight, setDepartureFlight] = useState(null);
  const [returnFlight, setReturnFlight] = useState(null);
  const navigate = useNavigate();

  const handleTripTypeSelection = (type) => {
    setTripType(type);
    
    // Navigate to departure flights for both one-way and round trip
    navigate('/departure-flight', { 
      state: { 
        tripType: type 
      } 
    });
  };

  const handleDepartureFlightSelection = (flight) => {
    setDepartureFlight(flight);
    
    // If one-way, proceed to passenger details
    if (tripType === 'oneway') {
      navigate('/price-details');
    } 
    // If round trip, go to return flights
    else if (tripType === 'round') {
      navigate('/return-flight');
    }
  };

  const handleReturnFlightSelection = (flight) => {
    setReturnFlight(flight);
    
    // For round trip, proceed to passenger details after selecting return flight
    navigate('/price-details');
  };

  return (
    <div>
      <PassengerBooking
        onTripTypeSelect={handleTripTypeSelection}
        tripType={tripType}
        onDepartureFlightSelect={handleDepartureFlightSelection}
      />
    </div>
  );
}

export default Flights;