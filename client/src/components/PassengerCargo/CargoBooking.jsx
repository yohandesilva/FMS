import React, { useState } from 'react';
import { Package, MapPin, Calendar, Weight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

function CargoBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    weight: '',
    dimensions: '',
    type: 'general',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Redirect to login if no token is found
        navigate('/login', { 
          state: { message: 'Please log in to book cargo shipments' }
        });
        return;
      }
      
      // Send POST request to create cargo booking
      const response = await axios.post('/cargo', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Cargo booking submitted successfully:', response.data);
      
      // Navigate to the acceptance declaration page with cargo ID
      navigate('/acceptance-declaration', { 
        state: { 
          formData,
          cargoId: response.data.cargo._id
        }
      });
    } catch (err) {
      console.error('Error submitting cargo booking:', err);
      setError(err.response?.data?.message || 'Failed to submit cargo booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-green-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Cargo Booking
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-green-200">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-blue-700 mb-2">From</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Origin City"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-blue-700 mb-2">To</label>
              <input
                type="text"
                name="to"
                value={formData.to}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Destination City"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-blue-700 mb-2">Shipping Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-blue-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter weight"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-blue-700 mb-2">Dimensions (LxWxH cm)</label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100x50x50"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-blue-700 mb-2">Cargo Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General Cargo</option>
                <option value="perishable">Perishable Goods</option>
                <option value="dangerous">Dangerous Goods</option>
                <option value="fragile">Fragile Items</option>
                <option value="valuable">Valuable Cargo</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm text-blue-700 mb-2">Cargo Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Provide cargo details"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : "Request Cargo Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CargoBooking;