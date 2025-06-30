const { body } = require('express-validator');

exports.updateVCValidator = [
    body('profile.firmName').optional().notEmpty().withMessage('Firm name cannot be empty'),
    body('profile.phone').optional().notEmpty().withMessage('Phone number cannot be empty'),
    body('location.country').optional().notEmpty().withMessage('Country cannot be empty'),
    body('investmentCriteria.industries').optional().isArray().withMessage('Industries must be an array'),
    body('investmentCriteria.stages').optional().isArray().withMessage('Stages must be an array')
];
