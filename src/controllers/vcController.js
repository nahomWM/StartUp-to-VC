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

exports.getVC = catchAsync(async (req, res, next) => {
    const vc = await vcService.getVCById(req.params.id);

    res.status(200).json({
        status: 'success',
        data: {
            vc
        }
    });
});

exports.updateVC = catchAsync(async (req, res, next) => {
    const vc = await vcService.updateVC(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            vc
        }
    });
});

exports.deleteVC = catchAsync(async (req, res, next) => {
    await vcService.deleteVC(req.params.id);

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getMe = catchAsync(async (req, res, next) => {
    const vc = await vcService.getMe(req.user.id);

    res.status(200).json({
        status: 'success',
        data: {
            vc
        }
    });
});
