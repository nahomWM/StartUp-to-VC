const Admin = require('../models/adminModel');
const AppError = require('../utils/AppError');

exports.getAllAdmins = async () => {
    const admins = await Admin.find();
    return admins;
};

exports.getAdminById = async (id) => {
    const admin = await Admin.findById(id);
    if (!admin) {
        throw new AppError('No admin found with that ID', 404);
    }
    return admin;
};
