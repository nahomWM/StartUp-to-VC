const vcService = require('../services/vcService');
const catchAsync = require('../utils/catchAsync');

exports.getAllVCs = catchAsync(async (req, res, next) => {
    const vcs = await vcService.getAllVCs(req.query);

    res.status(200).json({
        status: 'success',
        results: vcs.length,
        data: {
            vcs
        }
    });
});
