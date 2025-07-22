const { body } = require('express-validator');

exports.updateStartupValidator = [
    body('name').optional().notEmpty().withMessage('Startup name cannot be empty'),
    body('description').optional().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('industry').optional().isIn(['health', 'market', 'education', 'economic', 'finance', 'agriculture', 'humanResource', 'technology', 'other']).withMessage('Invalid industry'),
    body('contactInfo.phone').optional().notEmpty().withMessage('Phone number cannot be empty'),
    body('team.teamSize').optional().isInt({ min: 1 }).withMessage('Team size must be at least 1'),
    body('financials.fundingStage').optional().isIn(['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'growth']).withMessage('Invalid funding stage')
];
