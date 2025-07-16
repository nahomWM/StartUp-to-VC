const express = require('express');
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register/startup', authValidator.registerStartupValidator, authController.registerStartup);
router.post('/register/vc', authValidator.registerVCValidator, authController.registerVC);
router.post('/login', authValidator.loginValidator, authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authMiddleware.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.patch('/updateMe', authController.updateMe);
router.delete('/deleteMe', authController.deleteMe);
router.get('/me', authController.getMe);
