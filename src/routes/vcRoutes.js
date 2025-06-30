const express = require('express');
const vcController = require('../controllers/vcController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', vcController.getAllVCs);
