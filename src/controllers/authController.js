const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

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
