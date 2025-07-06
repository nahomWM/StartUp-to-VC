const express = require('express');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Admin registration and login are handled by authController but mounted on admin routes
router.post('/register', authController.registerStartup); // Placeholder
router.post('/login', authController.login);

router.use(authMiddleware.protect, authMiddleware.restrictTo('admin'));

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);

module.exports = router;
