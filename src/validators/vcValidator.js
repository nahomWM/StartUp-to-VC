const { body } = require('express-validator');

exports.registerVCValidator = [
    body('type').isIn(['individual', 'organization']).withMessage('Invalid VC type'),
    body('profile.firstName').if(body('type').equals('individual')).notEmpty().withMessage('First name is required for individuals'),
    body('profile.lastName').if(body('type').equals('individual')).notEmpty().withMessage('Last name is required for individuals'),
    body('profile.firmName').if(body('type').equals('organization')).notEmpty().withMessage('Firm name is required for organizations'),
    body('profile.phone').notEmpty().withMessage('Phone number is required'),
    body('location.country').notEmpty().withMessage('Country is required')
];

exports.updateVCValidator = [
    body('profile.phone').optional().notEmpty().withMessage('Phone number cannot be empty'),
    body('location.country').optional().notEmpty().withMessage('Country cannot be empty'),
    body('investmentCriteria.industries').optional().isArray().withMessage('Industries must be an array'),
    body('investmentCriteria.stages').optional().isArray().withMessage('Stages must be an array')
];
