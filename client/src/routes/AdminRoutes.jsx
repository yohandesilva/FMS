import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Admin/genaral/Header.jsx";
import Sidebar from "../components/Admin/genaral/SideBar.jsx";
import Airlines from "../pages/Admin/Airlines.jsx";
import Passenger from "../pages/Admin/Passengers.jsx";
import Cargoes from "../pages/Admin/Cargoes.jsx";
import Admins from "../pages/Admin/Admins.jsx";
import AdminsLogin from "../pages/Admin/AdminsLogin.jsx";

const AdminRoutes = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Layout component for admin routes
  const AdminLayout = ({ children }) => (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Sidebar & Main Content */}
      <div className="flex flex-1 pt-20 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content */}
        <div className="flex-grow bg-gray-100 transition-all duration-300">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<AdminsLogin />} />

      {/* Admin pages wrapped in layout */}
      <Route path="/" element={<AdminLayout><Airlines /></AdminLayout>} />
      <Route
        path="/passenger-booking-details"
        element={<AdminLayout><Passenger /></AdminLayout>}
      />
      <Route
        path="/cargo-booking-details"
        element={<AdminLayout><Cargoes /></AdminLayout>}
      />
      <Route
        path="/manage-admins"
        element={<AdminLayout><Admins /></AdminLayout>}
      />

    </Routes>
  );
};

export default AdminRoutes;
