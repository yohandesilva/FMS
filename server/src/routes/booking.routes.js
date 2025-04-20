const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Flight = require('../models/flight.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');

// Get all bookings (admin only)
router.get('/', auth, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email')
      .populate('flight');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { flightId, passengers, class: bookingClass, numberOfSeats, specialRequests } = req.body;

    // Check if flight exists and has available seats
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.seats.available < numberOfSeats) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // Calculate total amount
    const pricePerSeat = bookingClass === 'business' ? flight.price.business : flight.price.economy;
    const totalAmount = pricePerSeat * numberOfSeats;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      flight: flightId,
      passengers,
      class: bookingClass,
      numberOfSeats,
      totalAmount,
      specialRequests
    });

    await booking.save();

    // Update flight seats
    flight.seats.available -= numberOfSeats;
    await flight.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', auth, isAdmin, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status) booking.status = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel booking
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user is authorized to cancel this booking
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    // Update flight seats
    const flight = await Flight.findById(booking.flight);
    flight.seats.available += booking.numberOfSeats;
    await flight.save();

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 