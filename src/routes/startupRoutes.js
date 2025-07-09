const express = require('express');
const startupController = require('../controllers/startupController');
const authMiddleware = require('../middleware/auth');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.get('/', startupController.getAllStartups);
router.get('/:id', startupController.getStartup);
router.patch(
    '/:id',
    authMiddleware.protect,
    upload.fields([
        { name: 'businessLicense', maxCount: 1 },
        { name: 'nationalId', maxCount: 1 },
        { name: 'businessProposal', maxCount: 1 }
    ]),
    startupController.updateStartup
);
router.delete('/:id', authMiddleware.protect, startupController.deleteStartup);
router.get('/sector/:sector', startupController.getStartupsBySector);
