const express = require('express');
const startupController = require('../controllers/startupController');
const authMiddleware = require('../middleware/auth');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.get('/', startupController.getAllStartups);
router.get('/:id', startupController.getStartup);
router.patch('/:id', authMiddleware.protect, startupController.updateStartup);
