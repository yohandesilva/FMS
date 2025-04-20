import { Search, X, Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/Admin/logo-menu.png";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();

  // Sample user data
  const user = {
    name: "Admin User",
    role: "Administrator",
    profilePic: "/profile.jpg",
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement your search logic here
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header */}
      <header 
        className={`${darkMode ? 'bg-gray-900' : 'bg-blue-950'} 
                    px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left section - Logo & Menu */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu(!showMobileMenu);
              }}
              className="lg:hidden text-white hover:text-blue-200 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center">
              <img
                src={logo}
                alt="Airline Logo"
                className="h-10 object-contain"
              />
              <div className="ml-2 hidden sm:block">
                <h1 className="text-white font-bold text-xl tracking-tight">Airline Admin</h1>
                <p className="text-blue-200 text-xs">Management Dashboard</p>
              </div>
            </div>
          </div>

          {/* Middle section - Search (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search flights, passengers..."
                className={`w-full px-12 py-2.5 rounded-full focus:outline-none 
                          ${darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                            : 'bg-white/10 backdrop-blur-md border-blue-400/30 text-white placeholder-blue-100'} 
                          border transition-all duration-200`}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
              {searchQuery && (
                <button 
                  onClick={() => handleSearch("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Right section - Actions & Profile */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSearch(!showSearch);
              }}
              className="md:hidden text-white hover:text-blue-200 transition-colors"
            >
              {showSearch ? (
                <X className="w-6 h-6" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="text-white bg-black/20 p-2 rounded-full hover:bg-black/30 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full border-2 border-white/50 object-cover shadow-md"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`;
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="text-white hidden md:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-blue-200">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div 
          className={`fixed top-16 left-0 right-0 p-4 z-40 shadow-lg lg:hidden
                    ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700">Dashboard</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700">Flight Operations</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700">Passenger Management</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700">Crew Scheduling</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-800 dark:hover:bg-gray-700">Analytics</a>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="fixed top-16 left-0 right-0 p-4 md:hidden z-40 bg-blue-900/95 backdrop-blur-md">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search flights, passengers..."
              className="w-full bg-white/10 border border-blue-400/30 text-white px-10 py-2 rounded-full focus:outline-none focus:border-white placeholder-blue-100"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
            {searchQuery && (
              <button 
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content spacer to prevent header overlap */}
      <div className="h-16 md:h-16"></div>
    </>
  );
};

export default Header;