const VC = require('../models/vcModel');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVCs = async (queryString) => {
    const features = new APIFeatures(VC.find(), queryString)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const vcs = await features.query;
    return vcs;
};

exports.getVCById = async (id) => {
    const vc = await VC.findById(id);
    if (!vc) {
        throw new AppError('No VC found with that ID', 404);
    }
    return vc;
};

exports.updateVC = async (id, updateData) => {
    const vc = await VC.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!vc) {
        throw new AppError('No VC found with that ID', 404);
    }

    return vc;
};

exports.deleteVC = async (id) => {
    const vc = await VC.findByIdAndDelete(id);
    if (!vc) {
        throw new AppError('No VC found with that ID', 404);
    }
    return vc;
};
