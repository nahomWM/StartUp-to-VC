const { body } = require('express-validator');
const User = require('../models/userModel');

exports.registerStartupValidator = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already in use');
            }
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    body('name').notEmpty().withMessage('Startup name is required'),
    body('description').isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('industry').isIn(['health', 'market', 'education', 'economic', 'finance', 'agriculture', 'humanResource', 'technology', 'other']).withMessage('Invalid industry'),
    body('contactInfo.phone').notEmpty().withMessage('Phone number is required'),
    body('team.founderName').notEmpty().withMessage('Founder name is required')
];

exports.registerVCValidator = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .custom(async (value) => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('Email already in use');
            }
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('type').isIn(['individual', 'organization']).withMessage('Invalid VC type'),
    body('location.country').notEmpty().withMessage('Country is required')
];

exports.loginValidator = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Please provide a password'),
    body('role').isIn(['startup', 'vc', 'admin']).withMessage('Invalid role')
];
