import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../../assets/PassengerCargo/logo-menu.png";

const Navbar = ({ children }) => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/", color: "lightGreen" },
    { name: "Flights", href: "/flights", color: "mediumGreen" },
    { name: "Cargo", href: "/cargo", color: "darkGreen" },
    { name: "Contact Support", href: "/support", color: "emerald" },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const active = navLinks.find((link) => link.href === currentPath);
    if (active) setActiveLink(active.name);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Color mapping for gradients and effects
  const colorSchemes = {
    lightGreen: {
      gradient: "from-green-400 via-green-500 to-green-600",
      hoverBg: "hover:bg-green-700/10",
      activeText: "text-green-500",
      underline: "bg-green-500"
    },
    mediumGreen: {
      gradient: "from-green-600 via-green-700 to-green-800",
      hoverBg: "hover:bg-green-700/10",
      activeText: "text-green-600",
      underline: "bg-green-600"
    },
    darkGreen: {
      gradient: "from-green-800 via-green-900 to-emerald-900",
      hoverBg: "hover:bg-green-700/10",
      activeText: "text-green-700",
      underline: "bg-green-700"
    },
    emerald: {
      gradient: "from-emerald-600 via-emerald-700 to-emerald-800",
      hoverBg: "hover:bg-emerald-700/10",
      activeText: "text-emerald-600",
      underline: "bg-emerald-600"
    }
  };

  return (
    <>
      <nav 
        className={`
          bg-gradient-to-r 
          from-blue-900 via-blue-950 to-blue-950
          animate-gradient-x
          p-4 fixed top-0 left-0 w-full z-50 px-6 lg:px-16 
          transition-all duration-300 ease-in-out
          ${isScrolled ? 'shadow-2xl backdrop-blur-sm bg-opacity-90' : 'shadow-lg'}
          bg-size-200 
        `}
        style={{
          backgroundSize: '200% 100%',
          animation: 'gradient-x 15s ease infinite'
        }}
      >
        <style jsx>{`
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with Hover Effect */}
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="Logo" 
              className="h-16 transition-all duration-300 
                         hover:scale-110 hover:rotate-6 
                         transform-gpu origin-center"
            />
          </div>
          
          {/* Mobile Menu Toggle with Animated Hamburger */}
          <button
            className="lg:hidden text-white focus:outline-none group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className={`w-6 h-6 transition-all duration-300 
                          ${isMenuOpen ? 'rotate-90' : 'rotate-0'}
                          group-hover:scale-110`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>

          {/* Navigation Links with Enhanced Hover and Active States */}
          <div 
            className={`
              lg:flex space-x-6 ml-10 
              ${isMenuOpen ? 'block' : 'hidden'} lg:block 
              absolute lg:static top-16 left-0 w-full lg:w-auto 
              bg-black/50 lg:bg-transparent lg:p-0 p-4 
              lg:flex-row flex flex-col items-start lg:items-center 
              transition-all duration-300 ease-in-out 
              shadow-lg lg:shadow-none rounded-b-xl lg:rounded-none
            `}
          >
            {navLinks.map((link) => {
              const scheme = colorSchemes[link.color];
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`
                    relative px-4 py-2 rounded-lg 
                    transition-all duration-300 
                    text-white/80 hover:text-white 
                    w-full lg:w-auto group
                    ${scheme.hoverBg}
                    ${activeLink === link.name 
                      ? `font-semibold ${scheme.activeText}` 
                      : ''}
                  `}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Creative Underline and Hover Effect */}
                  <div 
                    className={`
                      absolute bottom-0 left-0 w-0 h-0.5 
                      ${scheme.underline} transition-all duration-500 
                      group-hover:w-full
                      ${activeLink === link.name ? 'w-full' : ''}
                    `}
                  ></div>
                </a>
              );
            })}
          </div>

          {/* Login Button with Expanded Interaction */}
          <div className="hidden lg:flex items-center">
            <a href="/login" className="group">
              <button 
                className="
                  bg-gradient-to-r from-blue-500 to-blue-700 
                  text-white px-6 py-2.5 rounded-lg 
                  shadow-lg hover:shadow-xl 
                  transition-all duration-300 
                  hover:scale-105 flex items-center
                  group-hover:bg-gradient-to-r 
                  group-hover:from-blue-600 group-hover:to-blue-800
                "
              >
                <span className="transition-transform group-hover:translate-x-1">Login</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transition-transform group-hover:rotate-90" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Layout with Smooth Transition */}
      <div className="pt-20 transition-all duration-300 ease-in-out">
        {children}
      </div>
    </>
  );
};

export default Navbar;