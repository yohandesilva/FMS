import { Link } from "react-router-dom";
import FooterLogo from "../../../assets/PassengerCargo/logo-menu.png";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-950 to-blue-900 text-white py-10 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Grid Layout with 4 Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left pb-20">
          {/* Section 1: Logo (Increased Size) */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={FooterLogo} 
              alt="Airport and Aviation Services Logo" 
              className="w-40 h-40 transition-transform duration-300 hover:scale-110" 
            />
          </div>
          
          {/* Section 2: Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/flights" 
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  Flights
                </Link>
              </li>
              <li>
                <Link 
                  to="/cargo" 
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  Cargo
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="hover:text-blue-300 transition-colors duration-300"
                >
                  Contact and Support
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Section 3: Address & Contact */}
          <div className="text-lg">
            <h4 className="text-lg font-semibold text-blue-300 mb-4">Contact Information</h4>
            <p className="mb-2">Colombo Bandaranaike International Airport (CMB)</p>
            <p className="mb-2">Airport and Aviation Services (Sri Lanka) (Private) Limited</p>
            <p className="mb-2">Canada Friendship Rd, Katunayake 11450, Sri Lanka</p>
            <p className="mt-2 flex items-center justify-center md:justify-start">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 text-blue-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.036 11.036 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +94 112 695 300
            </p>
          </div>
          
          {/* Section 4: Vision & Socials */}
          <div>
            <h4 className="text-lg font-semibold text-blue-300 mb-4">Our Vision</h4>
            <p className="italic text-md mb-4">
              "To provide exceptional air travel experiences with a commitment to safety, innovation, and customer-centric service. We aim to connect people and places seamlessly while fostering trust and reliability in both passenger and cargo transportation."
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a 
                href="#" 
                className="text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Links */}
        <div className="mt-8 border-t border-blue-700 pt-4 text-center text-base">
          <a 
            href="#" 
            className="hover:text-blue-300 mx-2 transition-colors duration-300"
          >
            Privacy Policy
          </a> | 
          <a 
            href="#" 
            className="hover:text-blue-300 mx-2 transition-colors duration-300"
          >
            Email Policy
          </a>
          <p className="mt-2 text-white/80">
            2024 © Airport and Aviation Services (Sri Lanka) (Private) Limited
          </p>
        </div>
      </div>
    </footer>
  );
}