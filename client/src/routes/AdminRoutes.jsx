// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Header from "../components/Admin/genaral/Header.jsx";
// import Sidebar from "../components/Admin/genaral/SideBar.jsx";
// import Airlines from "../pages/Admin/Airlines.jsx";
// import Passenger from "../pages/Admin/Passengers.jsx";
// import Cargoes from "../pages/Admin/Cargoes.jsx";
// import Admins from "../pages/Admin/Admins.jsx";
// import AdminsLogin from "../pages/Admin/AdminsLogin.jsx";

// const AdminRoutes = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
  
//   // Check if admin is logged in
//   const isAuthenticated = localStorage.getItem("adminToken") !== null;

//   // Layout component for authenticated routes
//   const AdminLayout = ({ children }) => (
//     <div className="h-screen flex flex-col">
//       {/* Header */}
//       <div className="fixed top-0 left-0 w-full z-50">
//         <Header />
//       </div>

//       {/* Sidebar & Main Content */}
//       <div className="flex flex-1 pt-20 overflow-hidden">
//         {/* Sidebar */}
//         <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

//         {/* Main Content */}
//         <div className={`flex-grow bg-gray-100 transition-all duration-300`}>
//           {children}
//         </div>
//       </div>
//     </div>
//   );

//   // Protected route component
//   const ProtectedRoute = ({ element }) => {
//     return isAuthenticated ? (
//       <AdminLayout>{element}</AdminLayout>
//     ) : (
//       <Navigate to="/admin/login" replace />
//     );
//   };

//   return (
//     <Routes>
//       {/* Public route */}
//       <Route path="/login" element={<AdminsLogin />} />
      
//       {/* Protected routes */}
//       <Route path="/" element={<ProtectedRoute element={<Airlines />} />} />
//       <Route path="/dashboard" element={<ProtectedRoute element={<Airlines />} />} />
//       <Route path="/passenger-booking-details" element={<ProtectedRoute element={<Passenger />} />} />
//       <Route path="/cargo-booking-details" element={<ProtectedRoute element={<Cargoes />} />} />
//       <Route path="/manage-admins" element={<ProtectedRoute element={<Admins />} />} />
      
//       {/* Redirect any unknown routes to dashboard */}
//       <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
//     </Routes>
//   );
// };

// export default AdminRoutes;


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

  // Layout component for all routes (no authentication check)
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
        <div className={`flex-grow bg-gray-100 transition-all duration-300`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      {/* All routes wrapped in AdminLayout */}
      <Route path="/login" element={<AdminsLogin />} /> {/* Keep login as a standalone page */}
      <Route path="/" element={<AdminLayout><Airlines /></AdminLayout>} />
      <Route path="/dashboard" element={<AdminLayout><Airlines /></AdminLayout>} />
      <Route path="/passenger-booking-details" element={<AdminLayout><Passenger /></AdminLayout>} />
      <Route path="/cargo-booking-details" element={<AdminLayout><Cargoes /></AdminLayout>} />
      <Route path="/manage-admins" element={<AdminLayout><Admins /></AdminLayout>} />
      
      {/* Redirect unknown routes to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;