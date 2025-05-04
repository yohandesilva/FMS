import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Mail, User, MessageSquare, Phone, CheckCircle, XCircle } from "lucide-react";

const Contact = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Fetch inquiries from the backend
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/api/contact/inquiries");
        setInquiries(response.data.inquiries);
        setError(null);
      } catch (err) {
        console.error("Error fetching inquiries:", err);
        setError("Failed to fetch inquiries. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle className="text-green-500" size={20} />;
      case "Rejected":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const markAsResolved = (inquiryId) => {
    const updatedInquiries = inquiries.map((inquiry) => {
      if (inquiry._id === inquiryId) {
        return { ...inquiry, status: "Resolved" };
      }
      return inquiry;
    });

    setInquiries(updatedInquiries);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-5 rounded-lg text-red-700 flex items-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 overflow-auto h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto">
        {inquiries.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <p className="text-blue-800 text-xl">No inquiries found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-auto max-h-[75vh]">
              <div className="bg-blue-800 p-4 sticky top-0">
                <h2 className="text-xl font-semibold text-white">Inquiry List</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <li
                    key={inquiry._id}
                    className={`p-4 hover:bg-blue-50 cursor-pointer transition duration-150 ${
                      selectedInquiry === inquiry._id ? "bg-blue-100" : ""
                    }`}
                    onClick={() => setSelectedInquiry(inquiry._id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User className="text-blue-800 mr-3" size={18} />
                        <span className="font-medium text-base">{inquiry.firstName} {inquiry.lastName}</span>
                      </div>
                      {inquiry.status && (
                        <div className="flex items-center text-sm text-gray-500">
                          {getStatusIcon(inquiry.status)}
                          <span className="ml-2">{inquiry.status}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-sm text-gray-600 truncate">{inquiry.subject}</div>
                  </li>
                ))}
              </ul>
            </div>

            {selectedInquiry && (
              <div className="bg-white rounded-lg shadow-lg overflow-auto max-h-[75vh]">
                <div className="bg-blue-900 p-4 sticky top-0">
                  <h2 className="text-xl font-semibold text-white">Inquiry Details</h2>
                </div>
                <div className="p-5">
                  {inquiries
                    .filter((inquiry) => inquiry._id === selectedInquiry)
                    .map((inquiry) => (
                      <div key={inquiry._id} className="space-y-4">
                        <div className="flex items-start">
                          <User className="text-blue-800 mr-3 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium text-base">{inquiry.firstName} {inquiry.lastName}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="text-blue-800 mr-3 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-base">{inquiry.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="text-blue-800 mr-3 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-base">{inquiry.phoneNumber || "Not provided"}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <MessageSquare className="text-blue-800 mr-3 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Subject</p>
                            <p className="font-medium text-base">{inquiry.subject}</p>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <p className="text-sm text-gray-500 mb-2">Message</p>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 relative text-base">
                            {inquiry.message}
                            {inquiry.status === "Resolved" && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle className="text-green-500" size={18} />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-5">
                          <button
                            className={`px-4 py-2 rounded-md text-base transition ${
                              inquiry.status === "Resolved"
                                ? "bg-green-100 text-green-800 cursor-default"
                                : "bg-blue-800 text-white hover:bg-blue-900"
                            }`}
                            onClick={() => markAsResolved(inquiry._id)}
                            disabled={inquiry.status === "Resolved"}
                          >
                            {inquiry.status === "Resolved" ? (
                              <span className="flex items-center">
                                <CheckCircle className="mr-2" size={16} />
                                Resolved
                              </span>
                            ) : (
                              "Mark as Resolved"
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;