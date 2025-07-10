const mongoose = require('mongoose');

const vcSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['individual', 'organization'],
        required: [true, 'Please specify VC type']
    },
    profile: {
        firstName: {
            type: String,
            required: function () { return this.type === 'individual'; }
        },
        lastName: {
            type: String,
            required: function () { return this.type === 'individual'; }
        },
        firmName: {
            type: String,
            required: function () { return this.type === 'organization'; }
        },
        phone: {
            type: String,
            required: [true, 'Please provide a contact number']
        },
        website: String,
        linkedin: String,
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot be more than 500 characters']
        }
    },
    location: {
        country: {
            type: String,
            required: [true, 'Please provide country']
        },
        city: String
    },
    investmentCriteria: {
        industries: [{
            type: String,
            enum: ['health', 'market', 'education', 'economic', 'finance', 'agriculture', 'humanResource', 'technology', 'other']
        }],
        stages: [{
            type: String,
            enum: ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'growth']
        }],
        ticketSize: {
            min: { type: Number, default: 0 },
            max: { type: Number }
        }
    },
    verification: {
        isVerified: {
            type: Boolean,
            default: false
        },
        documents: {
            license: String,
            additionalDocs: [String]
        },
        verifiedAt: Date
    },
    portfolio: [{
        startupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Startup'
        },
        investmentDate: Date,
        amount: Number,
        status: {
            type: String,
            enum: ['active', 'exited', 'failed'],
            default: 'active'
        }
    }],
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes
vcSchema.index({ 'investmentCriteria.industries': 1 });
vcSchema.index({ 'investmentCriteria.stages': 1 });
vcSchema.index({ 'location.country': 1 });

const VC = mongoose.model('VC', vcSchema);

module.exports = VC;
