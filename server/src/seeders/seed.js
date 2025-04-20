const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Flight = require('../models/flight.model');
const Booking = require('../models/booking.model');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flight-ease', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Flight.deleteMany({});
    await Booking.deleteMany({});
    console.log('Cleared existing data');

    // Seed Users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
        phone: '+94771234567',
        address: 'No 123, Colombo Road, Colombo 03'
      },
      {
        name: 'Admin User',
        email: 'admin@flightease.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        phone: '+94777654321',
        address: 'Flight Ease HQ, Airport Road, Katunayake'
      },
      {
        name: 'Cargo Client',
        email: 'cargo@example.com',
        password: await bcrypt.hash('cargo123', 10),
        role: 'user',
        phone: '+94765432198',
        address: 'Cargo Complex, Port City, Colombo'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users seeded');

    // Seed Flights
    const flights = [
      {
        flightNumber: 'UL308',
        airline: 'SriLankan Airlines',
        departure: {
          city: 'Colombo',
          airport: 'Bandaranaike International Airport',
          date: new Date('2024-10-09'),
          time: '12:00'
        },
        arrival: {
          city: 'Singapore',
          airport: 'Changi Airport',
          date: new Date('2024-10-09'),
          time: '19:00'
        },
        duration: '3h 30m',
        price: {
          baseFare: 44900,
          taxes: 93370,
          total: 138270
        },
        capacity: {
          economy: 150,
          business: 20
        },
        baggage: {
          checkIn: 15,
          cabin: 7
        },
        status: 'Scheduled',
        seatMap: {
          business: [
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F']
          ],
          economy: [
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F']
          ]
        }
      },
      {
        flightNumber: 'UL309',
        airline: 'SriLankan Airlines',
        departure: {
          city: 'Singapore',
          airport: 'Changi Airport',
          date: new Date('2024-10-10'),
          time: '09:00'
        },
        arrival: {
          city: 'Colombo',
          airport: 'Bandaranaike International Airport',
          date: new Date('2024-10-10'),
          time: '16:00'
        },
        duration: '3h 30m',
        price: {
          baseFare: 42900,
          taxes: 89370,
          total: 132270
        },
        capacity: {
          economy: 150,
          business: 20
        },
        baggage: {
          checkIn: 15,
          cabin: 7
        },
        status: 'Scheduled',
        seatMap: {
          business: [
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F']
          ],
          economy: [
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F'],
            ['A', 'B', 'C', '', 'D', 'E', 'F']
          ]
        }
      }
    ];

    const createdFlights = await Flight.insertMany(flights);
    console.log('Flights seeded');

    // Seed Bookings
    const bookings = [
      {
        user: createdUsers[0]._id, // John Doe
        flight: createdFlights[0]._id, // UL308
        bookingType: 'passenger',
        passengers: [{
          name: 'John Doe',
          passport: 'N1234567',
          seatNumber: '12A'
        }],
        status: 'confirmed',
        totalAmount: 138270,
        paymentStatus: 'paid',
        bookingDate: new Date()
      },
      {
        user: createdUsers[2]._id, // Cargo Client
        flight: createdFlights[1]._id, // UL309
        bookingType: 'cargo',
        cargo: {
          type: 'General Cargo',
          weight: 500,
          dimensions: {
            length: 100,
            width: 80,
            height: 60
          },
          description: 'Electronic components'
        },
        status: 'confirmed',
        totalAmount: 75000,
        paymentStatus: 'paid',
        bookingDate: new Date()
      }
    ];

    await Booking.insertMany(bookings);
    console.log('Bookings seeded');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 