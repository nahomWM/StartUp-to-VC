const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Admin registration and login are handled by authController but mounted on admin routes
router.post('/register', authController.registerStartup); // Placeholder, will refine
router.post('/login', authController.login);

module.exports = router;
