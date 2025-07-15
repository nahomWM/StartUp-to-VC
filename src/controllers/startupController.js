const startupService = require('../services/startupService');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.aliasTopStartups = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
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
    const filteredBody = filterObj(req.body, 'name', 'description', 'industry', 'contactInfo', 'team', 'financials', 'metrics');

    if (req.files) {
        if (req.files.businessLicense) filteredBody['documents.businessLicense'] = req.files.businessLicense[0].filename;
        if (req.files.nationalId) filteredBody['documents.nationalId'] = req.files.nationalId[0].filename;
        if (req.files.businessProposal) filteredBody['documents.businessProposal'] = req.files.businessProposal[0].filename;
    }

    const startup = await startupService.updateStartup(req.params.id, filteredBody);

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
