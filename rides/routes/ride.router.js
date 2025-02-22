const express = require('express');
const router = express.Router();
const authModdleware = require('../middleware/auth.middleware');
const rideController = require('../contollers/ride.contoller');

router.post('/create-ride', authModdleware.userAuth, rideController.createRide);
router.post('/accept-ride', authModdleware.captainAuth, rideController.acceptRide);

module.exports = router;
