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
