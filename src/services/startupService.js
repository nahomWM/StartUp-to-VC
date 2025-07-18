const Startup = require('../models/startupModel');
const AppError = require('../utils/AppError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllStartups = async (queryString) => {
    const features = new APIFeatures(Startup.find(), queryString)
        .search(['name', 'industry', 'description'])
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const startups = await features.query;
    return startups;
};

exports.getStartupById = async (id) => {
    const startup = await Startup.findById(id);
    if (!startup) {
        throw new AppError('No startup found with that ID', 404);
    }
    return startup;
};

exports.getStartupsBySector = async (sector) => {
    const startups = await Startup.find({ industry: sector });
    return startups;
};

exports.updateStartup = async (id, updateData) => {
    const startup = await Startup.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!startup) {
        throw new AppError('No startup found with that ID', 404);
    }

    return startup;
};

exports.deleteStartup = async (id) => {
    const startup = await Startup.findByIdAndDelete(id);

    if (!startup) {
        throw new AppError('No startup found with that ID', 404);
    }

    return startup;
};

exports.getStartupStats = async () => {
    const stats = await Startup.aggregate([
        {
            $group: {
                _id: '$industry',
                numStartups: { $sum: 1 },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
        {
            $sort: { avgRating: -1 }
        }
    ]);
    return stats;
};

exports.getMonthlyPlan = async (year) => {
    const plan = await Startup.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`)
                }
            }
        },
        {
            $group: {
                _id: { $month: '$createdAt' },
                numStartupStarts: { $sum: 1 },
                startups: { $push: '$name' }
            }
        },
        {
            $addFields: { month: '$_id' }
        },
        {
            $project: { _id: 0 }
        },
        {
            $sort: { numStartupStarts: -1 }
        }
    ]);
    return plan;
};
