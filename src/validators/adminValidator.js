const { body } = require('express-validator');

exports.updateAdminValidator = [
    body('name').optional().notEmpty().withMessage('Admin name cannot be empty'),
    body('level').optional().isIn(['super_admin', 'moderator', 'support']).withMessage('Invalid admin level'),
    body('permissions').optional().isArray().withMessage('Permissions must be an array')
];
