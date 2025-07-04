const Admin = require('../models/adminModel');
const AppError = require('../utils/AppError');

exports.getAllAdmins = async () => {
    const admins = await Admin.find();
    return admins;
};
