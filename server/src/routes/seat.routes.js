const express = require('express');
const router = express.Router();

// Seat routes
router.get('/flight/:flightId', (req, res) => {
  // TODO: Implement get seats for flight
  res.json({ message: 'Get seats for flight endpoint' });
});

router.post('/reserve', (req, res) => {
  // TODO: Implement seat reservation
  res.json({ message: 'Reserve seat endpoint' });
});

module.exports = router; 