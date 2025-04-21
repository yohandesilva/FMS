import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentMethod = () => {
  const location = useLocation();
  const { flightPrice = 0, seatFee = 0 } = location.state || {}; // Get flight price and seat fee from state

  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [saveCard, setSaveCard] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculate total payment amount
  const totalPayment = flightPrice + seatFee;

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPaymentSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
            <div className="bg-blue-100 px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="ml-2 font-bold text-lg text-blue-600">Rs {totalPayment.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Select Payment Method</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <button
                onClick={() => handleMethodChange("credit-card")}
                className={`p-4 border rounded-lg transition-all ${
                  selectedMethod === "credit-card" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                      selectedMethod === "credit-card" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                    }`}
                  >
                    {selectedMethod === "credit-card" && <div className="w-3 h-3 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-medium">Credit/Debit Card</span>
                </div>
              </button>

              <button
                onClick={() => handleMethodChange("paypal")}
                className={`p-4 border rounded-lg transition-all ${
                  selectedMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-300"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                      selectedMethod === "paypal" ? "border-blue-500 bg-blue-500" : "border-gray-400"
                    }`}
                  >
                    {selectedMethod === "paypal" && <div className="w-3 h-3 rounded-full bg-white"></div>}
                  </div>
                  <span className="font-medium">PayPal</span>
                </div>
              </button>
            </div>
          </div>

          {paymentSuccess ? (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">Your payment of Rs {totalPayment.toFixed(2)} has been processed successfully.</p>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Let's Fly!</h3>
            </div>
          ) : (
            <>
              {/* Credit Card Form */}
              {selectedMethod === "credit-card" && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={cardDetails.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveCard"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                      Save card details for future payments
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Pay Rs {totalPayment.toFixed(2)}
                    </button>
                  </div>
                </form>
              )}

              {/* PayPal Option */}
              {selectedMethod === "paypal" && (
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="mb-4">
                      <div className="inline-block bg-blue-100 p-4 rounded-full">
                        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7.5 6.5c0 3.2 2.3 5.8 5.5 5.8s5.5-2.6 5.5-5.8c0-3.2-2.3-5.8-5.5-5.8s-5.5 2.6-5.5 5.8zm12.5 0c0 5.5-4 10-9 10s-9-4.5-9-10 4-10 9-10 9 4.5 9 10z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      You'll be redirected to PayPal to complete your payment of <span className="font-bold">Rs {totalPayment.toFixed(2)}</span>.
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={handleSubmit}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Pay with PayPal
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;