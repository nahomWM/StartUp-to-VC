const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register/startup', authValidator.registerStartupValidator, authController.registerStartup);
