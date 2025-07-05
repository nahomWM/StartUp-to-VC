const adminService = require('../services/adminService');
const catchAsync = require('../utils/catchAsync');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
    const admins = await adminService.getAllAdmins();

    res.status(200).json({
        status: 'success',
        results: admins.length,
        data: {
            admins
        }
    });
});
