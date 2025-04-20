import React from 'react';
import { MapPin } from 'lucide-react';
import Newyork from '../../assets/PassengerCargo/NewYork.jpg';
import London from '../../assets/PassengerCargo/London.jpg';
import Tokyo from '../../assets/PassengerCargo/Tokyo.jpg';
import Dubai from '../../assets/PassengerCargo/Dubai.jpg';

const PopularDestinations = () => {
  const destinations = [
    { 
      city: 'New York', 
      description: 'The city that never sleeps',
      color: 'from-blue-600/60',
      image: Newyork
    },
    { 
      city: 'London', 
      description: 'Historic charm meets modern innovation',
      color: 'from-red-600/60',
      image: London
    },
    { 
      city: 'Tokyo', 
      description: 'Where tradition meets the future',
      color: 'from-purple-600/60',
      image: Tokyo
    },
    { 
      city: 'Dubai', 
      description: 'Luxury in the desert',
      color: 'from-amber-600/60',
      image: Dubai
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute w-64 h-64 rounded-full bg-blue-400 blur-3xl animate-pulse" 
             style={{top: '10%', left: '5%', animationDuration: '8s'}}></div>
        <div className="absolute w-56 h-56 rounded-full bg-purple-400 blur-3xl animate-pulse" 
             style={{bottom: '15%', right: '10%', animationDuration: '10s'}}></div>
        <div className="absolute w-40 h-40 rounded-full bg-pink-400 blur-3xl animate-pulse" 
             style={{top: '30%', right: '25%', animationDuration: '7s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stylized header with decorative elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Popular Destinations
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our most sought-after routes and discover your next adventure
          </p>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* Destination grid with enhanced cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.city} 
              className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl rounded-xl overflow-hidden"
            >
              <div className="relative h-[280px] overflow-hidden">
                {/* Background image with overlay */}
                <img 
                  src={destination.image} 
                  alt={destination.city}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${destination.color} to-gray-900/40 opacity-80 group-hover:opacity-70 transition-all duration-500`} />
                
                {/* Animated particle effects on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* City icon as a visual element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-white">
                  <MapPin className="w-40 h-40" />
                </div>
                
                {/* Info overlay with improved animation */}
                <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-sm bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center text-white mb-2">
                    <MapPin className="h-5 w-5 mr-2 text-white/80 animate-bounce group-hover:animate-none" style={{animationDuration: '3s'}} />
                    <span className="font-bold text-xl">{destination.city}</span>
                  </div>
                  <p className="text-white/90 text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:translate-y-0 translate-y-4">
                    {destination.description}
                  </p>
                </div>
                
                {/* Enhanced decorative corner accents */}
                <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45 transform rotate-0"></div>
                <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-white/50 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-rotate-45 transform rotate-0"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced decorative dots pattern with animation */}
        <div className="mt-16 flex justify-center">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
                style={{animationDelay: `${i * 0.2}s`, animationDuration: '2s'}}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;