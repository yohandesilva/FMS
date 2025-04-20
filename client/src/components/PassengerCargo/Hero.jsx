import React from 'react';
import { Users, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroImage from "../../assets/PassengerCargo/HeroImage.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="hero-container">
      {/* Background Image with Parallax Effect */}
      <div className="hero-background">
        <img
          src={HeroImage}
          alt="Airplane in sunset"
          className="hero-image"
        />
      </div>
      
      {/* Gradient Overlay with Custom Animation */}
      <div className="hero-overlay">
        {/* Flying Clouds Decoration */}
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        
        {/* Content Container */}
        <div className="hero-content">
          {/* Animated Text */}
          <h1 className="hero-title">
            <span className="title-line">Your Journey</span>
            <span className="title-gradient">Begins Here</span>
          </h1>
          
          <p className="hero-description">
            Experience seamless travel with SkyWay Airlines. Whether you're flying for business or leisure, 
            we ensure your comfort and safety at every step of your journey.
          </p>
          
          {/* Button Group with Hover Effects */}
          <div className="hero-buttons">
            <button
              onClick={() => navigate('/flights')}
              className="hero-button primary-button"
            >
              <span className="button-background"></span>
              <span className="button-content">
                <Users className="button-icon" />
                Book Flight
              </span>
            </button>
            
            <button
              onClick={() => navigate('/cargo')}
              className="hero-button secondary-button"
            >
              <span className="button-background"></span>
              <span className="button-content">
                <Package className="button-icon" />
                Ship Cargo
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS in JSX */}
      <style jsx>{`
        /* Hero Container */
        .hero-container {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
        }

        /* Background and Image */
        .hero-background {
          position: absolute;
          inset: 0;
          transform: scale(1.1);
          animation: slowZoom 20s infinite alternate ease-in-out;
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.1) saturate(1.2);
        }

        @keyframes slowZoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.2); }
        }

        /* Gradient Overlay */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, transparent 100%);
          animation: gradientPulse 8s infinite alternate;
        }

        @keyframes gradientPulse {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }

        /* Cloud Decorations */
        .cloud {
          position: absolute;
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.2;
        }

        .cloud-1 {
          top: 15%;
          left: 10%;
          width: 10rem;
          height: 3rem;
          background-color: white;
          animation: float 20s infinite ease-in-out;
        }

        .cloud-2 {
          top: 25%;
          right: 15%;
          width: 15rem;
          height: 2.5rem;
          background-color: white;
          animation: float 25s infinite ease-in-out reverse;
        }

        .cloud-3 {
          top: 40%;
          left: 25%;
          width: 8rem;
          height: 2rem;
          background-color: white;
          animation: float 18s infinite ease-in-out 2s;
        }

        @keyframes float {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(30px) translateY(-10px); }
          50% { transform: translateX(15px) translateY(10px); }
          75% { transform: translateX(-15px) translateY(-5px); }
          100% { transform: translateX(0) translateY(0); }
        }

        /* Content Styles */
        .hero-content {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        /* Title Styles */
        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
          animation: fadeIn 1s ease-in-out;
        }

        .title-line {
          display: block;
          transform: translateX(0);
          transition: transform 0.3s;
        }

        .title-line:hover {
          transform: translateX(0.5rem);
        }

        .title-gradient {
          display: block;
          margin-top: 0.5rem;
          background: linear-gradient(to right, #60a5fa, #e0f2fe);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transform: translateX(0);
          transition: transform 0.5s;
        }

        .title-gradient:hover {
          transform: translateX(0.5rem);
          background: linear-gradient(to right, #3b82f6, #93c5fd);
          -webkit-background-clip: text;
          background-clip: text;
        }

        /* Description Styles */
        .hero-description {
          font-size: 1.25rem;
          color: #e5e7eb;
          margin-bottom: 2.5rem;
          max-width: 36rem;
          animation: fadeIn 1.2s ease-in-out 0.3s backwards;
          line-height: 1.6;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Button Styles */
        .hero-buttons {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: riseUp 1.5s ease-out 0.6s backwards;
        }

        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row;
          }
        }

                @keyframes riseUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-button {
          position: relative;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.3s;
          cursor: pointer;
        }

        .hero-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .primary-button {
          background-color: #2ecc71;
          color: white;
        }

        .primary-button:hover {
          box-shadow: 0 8px 20px rgba(46, 204, 113, 0.4);
        }

        .secondary-button {
          background-color: #f39c12;
          color: white;
        }

        .secondary-button:hover {
          box-shadow: 0 8px 20px rgba(243, 156, 18, 0.4);
        }

        .button-background {
          position: absolute;
          width: 0;
          height: 0;
          border-radius: 50%;
          transition: all 0.5s ease-in-out;
          z-index: 1;
        }

        .primary-button .button-background {
          background-color: #27ae60;
        }

        .secondary-button .button-background {
          background-color: #d35400;
        }

        .hero-button:hover .button-background {
          width: 300%;
          height: 300%;
        }

        .button-content {
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .button-icon {
          height: 1.25rem;
          width: 1.25rem;
          margin-right: 0.5rem;
          transition: transform 0.3s;
        }

        .hero-button:hover .button-icon {
          transform: scale(1.2) rotate(5deg);
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        .scroll-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .scroll-mouse {
          width: 1.5rem;
          height: 2.5rem;
          border: 2px solid rgba(255, 255, 255, 0.5);
          border-radius: 9999px;
          display: flex;
          justify-content: center;
        }

        .scroll-dot {
          width: 0.375rem;
          height: 0.375rem;
          background-color: white;
          border-radius: 50%;
          margin-top: 0.5rem;
          animation: scrollDown 1.5s infinite;
        }

        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(1rem); opacity: 0; }
        }

        /* Responsive Styles */
        @media (min-width: 768px) {
          .hero-title {
            font-size: 4.5rem;
          }
          
          .hero-description {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-description {
            font-size: 1.125rem;
          }
          
          .cloud-1, .cloud-2, .cloud-3 {
            width: 30%;
            height: 1.5rem;
          }
        }

        @media (max-height: 700px) {
          .hero-title {
            margin-bottom: 1rem;
          }
          
          .hero-description {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;