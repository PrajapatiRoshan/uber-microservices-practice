const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.contoller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/profile', authMiddleware.userAuth, userController.profile);
router.get('/accepted-ride', authMiddleware.userAuth, userController.acceptedRide);

module.exports = router;
