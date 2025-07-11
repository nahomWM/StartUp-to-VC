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

exports.getAdmin = catchAsync(async (req, res, next) => {
    const admin = await adminService.getAdminById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    });
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
    const admin = await adminService.updateAdmin(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    });
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
    await adminService.deleteAdmin(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const admin = await adminService.getMe(req.user.id);

    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    const admin = await adminService.updateMe(req.user.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            admin
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await adminService.deleteMe(req.user.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});
