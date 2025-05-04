import React, { useState } from "react";
import { ChevronLeft, ChevronRight, HelpCircle, LogOut, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("all");
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { 
      id: "all", 
      label: "Airlines", 
      icon: <AirplaneIcon />, 
      url: "/admin" 
    },
    {
      id: "passenger",
      label: "Passenger Booking",
      icon: <PassengerIcon />,
      url: "/admin/passenger-booking-details",
    },
    {
      id: "cargo",
      label: "Cargo Booking",
      icon: <CargoIcon />,
      url: "/admin/cargo-booking-details",
    },
    {
      id: "admins",
      label: "Manage Admins",
      icon: <Users size={24} />,
      url: "/admin/manage-admins",
    },
    {
      id: "help",
      label: "Help Center",
      icon: <HelpCircle size={24} />,
      url: "/admin/help",
    }
  ];

  const handleNavigation = (pageId, url) => {
    setCurrentPage(pageId);

    if (pageId === "logout") {
      // Clear adminToken from localStorage
      localStorage.removeItem("adminToken");
      // Navigate to login page (or home page)
      navigate("/admin/login"); // Adjust this URL as needed
    } else {
      navigate(url);
    }
  };

  // Custom SVG Icons (unchanged)
  function AirplaneIcon() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 16.21V15.16C22 13.96 21.02 12.97 19.83 13.01H19.82C19.24 13.01 18.71 13.29 18.37 13.75L15.29 18.18C14.44 19.3 13.11 20 11.63 20H4C2.9 20 2 19.1 2 18V17C2 16.45 2.45 16 3 16H11.63C12.41 16 13.12 15.63 13.55 14.97L15.29 12.25C15.63 11.79 16.16 11.51 16.74 11.51H16.75C17.94 11.47 18.92 12.46 18.92 13.66V14.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 10C10.3284 10 11 9.32843 11 8.5C11 7.67157 10.3284 7 9.5 7C8.67157 7 8 7.67157 8 8.5C8 9.32843 8.67157 10 9.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 12V4C22 2.9 21.1 2 20 2H12C10.9 2 10 2.9 10 4V12C10 13.1 10.9 14 12 14H20C21.1 14 22 13.1 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  function PassengerIcon() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  function CargoIcon() {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22H17C19.2091 22 21 20.2091 21 18V9C21 7.79086 19.2091 6 17 6H12C9.79086 6 8 7.79086 8 9V18C8 20.2091 9.79086 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6V4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 20H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-b from-blue-950 to-blue-900 text-white flex flex-col h-full transition-all duration-300 shadow-xl relative`}
    >
      {/* Logo/Collapse Button */}
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        {!isCollapsed && (
          <h1 className="text-xl font-bold tracking-tight">AirAdmin Pro</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-blue-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={20} className="text-white" />
          ) : (
            <ChevronLeft size={20} className="text-white" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleNavigation(item.id, item.url)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  currentPage === item.id
                    ? "bg-blue-600 shadow-md"
                    : hoveredItem === item.id
                    ? "bg-blue-700"
                    : "hover:bg-blue-700"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 ${
                    currentPage === item.id ? "text-white" : "text-blue-200"
                  }`}
                >
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-blue-800 p-4">
        <ul className="space-y-2">
          <li>
            <button
              className={`w-full flex items-center p-3 rounded-lg transition-colors hover:bg-blue-800 ${
                currentPage === "logout" ? "bg-blue-700" : ""
              }`}
              onClick={() => handleNavigation("logout", "/logout")}
            >
              <LogOut
                size={20}
                className={currentPage === "logout" ? "text-white" : "text-blue-200"}
              />
              {!isCollapsed && (
                <span className="ml-3 font-medium">Logout</span>
              )}
            </button>
          </li>
        </ul>
      </div>

      {/* Collapsed Tooltips */}
      {isCollapsed && hoveredItem && (
        <div 
          className="absolute left-full top-0 ml-2 bg-white shadow-lg rounded-lg p-2 z-10"
          style={{
            top: menuItems.findIndex(item => item.id === hoveredItem) * 56 + 80
          }}
        >
          <div className="px-3 py-2 text-sm text-gray-700 whitespace-nowrap">
            {menuItems.find(item => item.id === hoveredItem)?.label}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;