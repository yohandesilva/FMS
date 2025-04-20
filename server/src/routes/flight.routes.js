const express = require('express');
const router = express.Router();
const Flight = require('../models/flight.model');
const { auth, isAdmin } = require('../middleware/auth.middleware');

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single flight
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create flight (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update flight (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete flight (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search flights
router.get('/search', async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    const query = {};
    
    if (departure) query['departure.airport'] = departure;
    if (arrival) query['arrival.airport'] = arrival;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query['departure.time'] = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 