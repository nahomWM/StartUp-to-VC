const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Startup = require('../models/startupModel');
const VC = require('../models/vcModel');
const Admin = require('../models/adminModel');
const AppError = require('../utils/AppError');
const config = require('../config/environment');

const signToken = (id) => {
    return jwt.sign({ id }, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: config.env === 'production'
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.register = async (userData, roleData, role) => {
    let entity;

    // 1) Create specific role entity
    if (role === 'startup') {
        entity = await Startup.create(roleData);
    } else if (role === 'vc') {
        entity = await VC.create(roleData);
    } else if (role === 'admin') {
        entity = await Admin.create(roleData);
    }

    // 2) Create user
    const user = await User.create({
        ...userData,
        role,
        entityId: entity._id,
        roleModel: role === 'startup' ? 'Startup' : (role === 'vc' ? 'VC' : undefined)
    });

    return { user, entity };
};

exports.login = async (email, password, role) => {
    // 1) Check if email and password exist
    if (!email || !password) {
        throw new AppError('Please provide email and password', 400);
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email, role }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new AppError('Incorrect email or password', 401);
    }

    // 3) Check if user is active
    if (user.isActive === false) {
        throw new AppError('Your account has been deactivated. Please contact support.', 401);
    }

    return user;
};

exports.createSendToken = createSendToken;

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('There is no user with email address.', 404);
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    return resetToken;
};

exports.resetPassword = async (token, password, passwordConfirm) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new AppError('Token is invalid or has expired', 400);
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return user;
};

exports.updatePassword = async (user, currentPassword, newPassword, newPasswordConfirm) => {
    if (!(await user.correctPassword(currentPassword, user.password))) {
        throw new AppError('Your current password is wrong', 401);
    }

    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save();

    return user;
};

exports.updateMe = async (user, updateData) => {
    // 1) Filter out unwanted fields
    const filteredBody = filterObj(updateData, 'email'); // Only allow email update for now

    // 2) Update user document
    const updatedUser = await User.findByIdAndUpdate(user.id, filteredBody, {
        new: true,
        runValidators: true
    });

    return updatedUser;
};

exports.deleteMe = async (user) => {
    await User.findByIdAndUpdate(user.id, { isActive: false });
};

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};
