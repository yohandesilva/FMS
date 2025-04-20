import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookSeat = () => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seat configuration
  const seatConfig = {
    rows: Array.from({length: 30}, (_, i) => i + 1),
    columns: {
      left: ['A', 'B', 'C'],
      right: ['H', 'J', 'K']
    },
    availableRows: [16, 17, 19, 3, 5, 8]
  };

  // Validate form (previously missing implementation)
  const validateForm = () => {
    return selectedSeats.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Store selected seats in localStorage
      localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
      navigate('/payment-methods');
    } else {
      alert('Please select at least one seat');
    }
  };

  // Legend items (removed extra leg room)
  const legendItems = [
    { color: 'bg-green-500', label: 'Selected Seat', textColor: 'text-blue' },
    { color: 'bg-green-400', label: 'Available (No Extra Charge)', textColor: 'text-blue' },
    { color: 'bg-purple-500', label: 'Chargeable Seat (Rs 12,000)', textColor: 'text-blue' },
    { color: 'bg-indigo-500', label: 'Chargeable Seat (Rs 6,000)', textColor: 'text-blue' },
    { color: 'bg-gray-300', label: 'Not Available', textColor: 'text-blue' }
  ];

  // Determine seat status and pricing
  const getSeatStatus = (row, seat) => {
    // A and K seats are Rs 12,000
    if (seat === 'A' || seat === 'K') return 'chargeable-high';
    
    // C and H seats are Rs 6,000
    if (seat === 'C' || seat === 'H') return 'chargeable-low';
    
    // Check available rows
    if (seatConfig.availableRows.includes(row)) return 'available';
    
    return 'unavailable';
  };

  // Handle seat selection
  const handleSeatSelect = (row, seat) => {
    const seatKey = `${row}${seat}`;
    const status = getSeatStatus(row, seat);

    if (status === 'available' || status === 'chargeable-high' || status === 'chargeable-low') {
      setSelectedSeats(prev => 
        prev.includes(seatKey) 
          ? prev.filter(s => s !== seatKey)
          : [...prev, seatKey]
      );
    }
  };

  // Render individual seat
  const renderSeat = (row, seat) => {
    const seatKey = `${row}${seat}`;
    const status = getSeatStatus(row, seat);
    const isSelected = selectedSeats.includes(seatKey);

    const seatClasses = {
      'available': 'bg-green-400 hover:bg-green-500',
      'chargeable-high': 'bg-purple-500 hover:bg-purple-600',
      'chargeable-low': 'bg-indigo-500 hover:bg-indigo-600',
      'unavailable': 'bg-gray-300 cursor-not-allowed'
    };

    return (
      <div 
        key={seatKey}
        className={`
          w-8 h-8 rounded-md flex items-center justify-center 
          text-xs font-bold text-white transition-all duration-300
          ${seatClasses[status]}
          ${isSelected ? 'ring-4 ring-blue-600 scale-110' : ''}
          ${(['available', 'chargeable-high', 'chargeable-low'].includes(status)) 
            ? 'cursor-pointer' 
            : 'cursor-not-allowed opacity-50'}
        `}
        onClick={() => handleSeatSelect(row, seat)}
      >
        {seat}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">UL207 Airbus A320</h1>
          <p className="text-gray-600">Colombo - Abu Dhabi</p>
        </div>

        <div className="flex space-x-4">
          {/* Seat Map */}
          <div className="flex-grow">
            {seatConfig.rows.map((row) => (
              <div key={row} className="flex items-center mb-2">
                <div className="w-10 text-right mr-4 text-gray-500">{row}</div>
                <div className="flex">
                  <div className="flex space-x-1 mr-4">
                    {seatConfig.columns.left.map((seat) => renderSeat(row, seat))}
                  </div>
                  <div className="w-8"></div>
                  <div className="flex space-x-1">
                    {seatConfig.columns.right.map((seat) => renderSeat(row, seat))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend and Selected Seats */}
          <div className="w-64 space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Seat Legend</h3>
              {legendItems.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className={`w-5 h-5 mr-3 rounded ${item.color}`}></div>
                  <span className={`${item.textColor}`}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Selected Seats</h2>
              {selectedSeats.length === 0 ? (
                <p className="text-gray-500">No seats selected</p>
              ) : (
                <ul className="space-y-2">
                  {selectedSeats.map((seat) => {
                    const seatStatus = getSeatStatus(
                      parseInt(seat.slice(0, -1)), 
                      seat.slice(-1)
                    );
                    const priceLabel = 
                      seatStatus === 'chargeable-high' ? 'Rs 12,000' : 
                      seatStatus === 'chargeable-low' ? 'Rs 6,000' : 
                      'No Extra Charge';
                    
                    return (
                      <li 
                        key={seat} 
                        className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm"
                      >
                        <span>{seat} - {priceLabel}</span>
                        <button 
                          type="button"
                          onClick={() => setSelectedSeats((prev) => 
                            prev.filter((s) => s !== seat)
                          )}
                          className="text-red-500 hover:bg-red-100 rounded-full p-1"
                        >
                          ✕
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="mt-6 flex justify-between w-full">
              <button 
                type="button"
                onClick={() => setSelectedSeats([])} 
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Clear Selection
              </button>
              <button 
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookSeat;