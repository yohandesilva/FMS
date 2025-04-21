import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Price = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get selected flights from state
  const selectedDepartureFlight = location.state?.selectedDepartureFlight;
  const selectedReturnFlight = location.state?.selectedReturnFlight;

  // Determine the initial price (roundTripPrice or oneWayPrice)
  const initialPrice =
    selectedReturnFlight?.roundTripPrice ||
    selectedDepartureFlight?.oneWayPrice ||
    0;

  // Calculate Base Fare and Taxes & Carrier Fees (each is half of the initial price)
  const baseFare = initialPrice / 2;
  const taxesAndFees = initialPrice / 2;

  const handleContinue = () => {
    navigate("/passenger-details");
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative bg-white shadow-2xl rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-4xl">
        {/* Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-10 pointer-events-none"></div>

        {/* Header with Animated Border */}
        <div className="relative bg-green-50 p-6 border-b-4 border-blue-500 animate-pulse-soft">
          <h2 className="text-2xl font-extrabold text-blue-900 tracking-wide">
            Flight Pricing Details
            <span className="block text-sm font-light text-blue-700 mt-1">
              Comprehensive Fare Breakdown
            </span>
          </h2>
        </div>

        {/* Pricing Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Price Details */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-green-100">
              <div className="flex justify-between items-center">
                <span className="text-blue-800 font-semibold">Initial Price</span>
                <span className="text-red-500 line-through decoration-2 opacity-70">
                  $ {initialPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-green-100 p-4 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <span className="text-blue-900 font-bold">Discounted Price</span>
                <span className="text-blue-800 font-extrabold text-xl">
                  $ {initialPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Breakdown */}
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-blue-100">
              <div className="flex justify-between text-blue-800">
                <span>Base Fare</span>
                <span className="font-semibold">
                  $ {baseFare.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-xl shadow-md transition-all duration-300 hover:bg-blue-100">
              <div className="flex justify-between text-blue-800">
                <span>Taxes & Carrier Fees</span>
                <span className="font-semibold">
                  $ {taxesAndFees.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-blue-500 text-white p-4 text-center">
          <p className="font-bold tracking-wide">
            Total Price for All Travelers
            <span className="block text-sm font-light mt-1">
              Inclusive of Taxes and Carrier Imposed Fees
            </span>
          </p>
        </div>

        {/* Continue Button */}
        <div className="p-6 text-center">
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
          >
            <span>Continue to Passenger Details</span>
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Price;