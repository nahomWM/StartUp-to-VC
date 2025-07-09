const startupService = require('../services/startupService');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getAllStartups = catchAsync(async (req, res, next) => {
    const startups = await startupService.getAllStartups(req.query);

    res.status(200).json({
        status: 'success',
        results: startups.length,
        data: {
            startups
        }
    });
});

exports.getStartup = catchAsync(async (req, res, next) => {
    const startup = await startupService.getStartupById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            startup
        }
    });
});

exports.getStartupsBySector = catchAsync(async (req, res, next) => {
    const startups = await startupService.getStartupsBySector(req.params.sector);

    res.status(200).json({
        status: 'success',
        results: startups.length,
        data: {
            startups
        }
    });
});

exports.updateStartup = catchAsync(async (req, res, next) => {
    const startup = await startupService.updateStartup(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            startup
        }
    });
});

exports.deleteStartup = catchAsync(async (req, res, next) => {
    await startupService.deleteStartup(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});
