const express = require('express');
const authController = require('../controllers/authController');
const startupController = require('../controllers/startupController');
const vcController = require('../controllers/vcController');

const router = express.Router();

// Admin registration and login are handled by authController but mounted on admin routes
router.post('/register', adminValidator.registerAdminValidator, authController.registerStartup); // Placeholder
router.post('/login', authController.login);

router.use(authMiddleware.protect, authMiddleware.restrictTo('admin'));

router.get('/startup-stats', startupController.getStartupStats);
router.get('/vc-stats', vcController.getVCStats);
router.get('/monthly-plan/:year', startupController.getMonthlyPlan);

router.get('/me', adminController.getMe);
router.patch('/updateMe', adminValidator.updateAdminValidator, adminController.updateMe);
router.delete('/deleteMe', adminController.deleteMe);

router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdmin);
router.patch('/:id', adminValidator.updateAdminValidator, adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;

module.exports = router;
