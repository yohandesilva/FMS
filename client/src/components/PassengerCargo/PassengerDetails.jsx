import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axiosConfig";

const PassengerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight_id, flightPrice, tripType } = location.state || {};

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    passport: "",
    email: "",
    mobile: "",
    businessPhone: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    receiveOffers: false,
    dateOfBirth: "",
    gender: "",
    documentType: "",
    documentNumber: "",
    nationalityCountryCode: "",
    issuingCountryCode: "",
    expirationDate: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    expDay: "",
    expMonth: "",
    expYear: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "title",
      "firstName",
      "lastName",
      "email",
      "documentType",
      "documentNumber",
      "dobDay",
      "dobMonth",
      "dobYear",
      "expDay",
      "expMonth",
      "expYear",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(
        `Please fill out the following required fields: ${missingFields.join(
          ", "
        )}`
      );
      return false;
    }
    if (isNaN(new Date(`${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`))) {
      alert("Please enter a valid Date of Birth.");
      return false;
    }
    if (isNaN(new Date(`${formData.expYear}-${formData.expMonth}-${formData.expDay}`))) {
      alert("Please enter a valid Expiration Date.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!flight_id) {
      alert("Flight information is missing. Please go back and select a flight.");
      console.error("Error: flight_id is missing in PassengerDetails handleSubmit");
      return;
    }

    const dateOfBirth = `${formData.dobYear}-${String(formData.dobMonth).padStart(2, '0')}-${String(formData.dobDay).padStart(2, '0')}`;
    const expirationDate = `${formData.expYear}-${String(formData.expMonth).padStart(2, '0')}-${String(formData.expDay).padStart(2, '0')}`;

    const updatedFormData = {
      ...formData,
      dateOfBirth,
      expirationDate,
      flight_id,
    };

    delete updatedFormData.dobDay;
    delete updatedFormData.dobMonth;
    delete updatedFormData.dobYear;
    delete updatedFormData.expDay;
    delete updatedFormData.expMonth;
    delete updatedFormData.expYear;

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/passenger/details",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Passenger details saved successfully!");
        navigate("/booking-seats", {
          state: {
            flight_id,
            passenger_id: response.data.passenger_id,
            flightPrice,
            tripType,
          },
        });
        console.log("Navigating to BookSeat with:", {
          flight_id,
          passenger_id: response.data.passenger_id,
          flightPrice,
          tripType,
        });
      } else {
        alert(response.data.message || "Failed to save passenger details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving passenger details:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while saving passenger details. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 pt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h2 className="text-xl font-bold text-blue-800">ADULT</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
              <option value="Dr">Dr</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First/Middle Name as per the passport *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Family/Last Name as per the passport *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Number
            </label>
            <input
              type="text"
              name="passport"
              value={formData.passport}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            CONTACT INFORMATION
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Residence / Home Phone
              </label>
              <div className="flex">
                <select
                  name="mobileCountryCode"
                  className="w-20 border border-gray-300 rounded-l-md p-2"
                >
                  <option>+1</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-r-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Phone
              </label>
              <div className="flex">
                <select
                  name="businessPhoneCountryCode"
                  className="w-20 border border-gray-300 rounded-l-md p-2"
                >
                  <option>+1</option>
                </select>
                <input
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-r-md p-2"
                />
              </div>
            </div>

            <div className="col-span-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="receiveOffers"
                  checked={formData.receiveOffers}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">
                  I confirm that I would like to receive the latest offers
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            Emergency Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                In Case of Emergency contact name
              </label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <select
                  name="emergencyContactCountryCode"
                  className="w-20 border border-gray-300 rounded-l-md p-2"
                >
                  <option>+1</option>
                </select>
                <input
                  type="tel"
                  name="emergencyContactNumber"
                  value={formData.emergencyContactNumber}
                  onChange={handleChange}
                  className="flex-1 border border-gray-300 rounded-r-md p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">
            IDENTIFICATION DOCUMENT
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <div className="flex space-x-2">
                <select
                  name="dobDay"
                  value={formData.dobDay}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="dobMonth"
                  value={formData.dobMonth}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                    (month, i) => (
                      <option key={month} value={i + 1}>
                        {month}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="dobYear"
                  value={formData.dobYear}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                  {[...Array(100)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select Document Type</option>
                <option value="passport">Passport</option>
                <option value="nationalID">National ID</option>
                <option value="driverLicense">Driver's License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Document Number
              </label>
              <input
                type="text"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality Country Code
              </label>
              <input
                type="text"
                name="nationalityCountryCode"
                value={formData.nationalityCountryCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Country Code
              </label>
              <input
                type="text"
                name="issuingCountryCode"
                value={formData.issuingCountryCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date *
              </label>
              <div className="flex space-x-2">
                <select
                  name="expDay"
                  value={formData.expDay}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="expMonth"
                  value={formData.expMonth}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(
                    (month, i) => (
                      <option key={month} value={i + 1}>
                        {month}
                      </option>
                    )
                  )}
                </select>
                <select
                  name="expYear"
                  value={formData.expYear}
                  className="w-1/3 border border-gray-300 rounded-md p-2"
                  onChange={handleChange}
                  required
                >
                  <option value="">Year</option>
                  {[...Array(30)].map((_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save and Continue to Seat Selection
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerDetails;