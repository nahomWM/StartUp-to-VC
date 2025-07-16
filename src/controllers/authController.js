const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.registerStartup = catchAsync(async (req, res, next) => {
    const { email, password, passwordConfirm, ...startupData } = req.body;

    const { user, entity } = await authService.register(
        { email, password, passwordConfirm },
        startupData,
        'startup'
    );

    authService.createSendToken(user, 201, res);
});

exports.registerVC = catchAsync(async (req, res, next) => {
    const { email, password, passwordConfirm, ...vcData } = req.body;

    const { user, entity } = await authService.register(
        { email, password, passwordConfirm },
        vcData,
        'vc'
    );

    authService.createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!role) {
        return next(new AppError('Please specify your role', 400));
    }

    const user = await authService.login(email, password, role);
    authService.createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const resetToken = await authService.forgotPassword(req.body.email);

    // In a real app, we would send an email here
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!',
        resetToken // Sending token in response for development/testing
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const user = await authService.resetPassword(
        req.params.token,
        req.body.password,
        req.body.passwordConfirm
    );

    authService.createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await authService.updatePassword(
        req.user,
        req.body.passwordCurrent,
        req.body.password,
        req.body.passwordConfirm
    );

    authService.createSendToken(user, 200, res);
});

exports.getMe = catchAsync(async (req, res, next) => {
    // Populate the entity details based on role
    let user = req.user;

    if (user.role !== 'admin') {
        user = await user.populate('entityId');
    }

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

exports.updateMe = catchAsync(async (req, res, next) => {
    const updatedUser = await authService.updateMe(req.user, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
    await authService.deleteMe(req.user);

    res.status(204).json({
        status: 'success',
        data: null
    });
});
