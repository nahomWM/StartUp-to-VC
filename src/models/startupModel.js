const mongoose = require('mongoose');

const startUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your startup name'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description of your startup'],
        trim: true,
        minlength: [20, 'Description must be at least 20 characters']
    },
    industry: {
        type: String,
        enum: {
            values: ['health', 'market', 'education', 'economic', 'finance', 'agriculture', 'humanResource', 'technology', 'other'],
            message: 'Industry is either: health, market, education, economic, finance, agriculture, humanResource, technology, other'
        },
        required: [true, 'Please specify your industry']
    },
    contactInfo: {
        phone: {
            type: String,
            required: [true, 'Please provide a contact number']
        },
        website: { type: String },
        linkedin: { type: String }
    },
    location: {
        country: {
            type: String,
            default: 'Ethiopia',
            required: true
        },
        city: { type: String }
    },
    team: {
        founderName: {
            type: String,
            required: [true, 'Please provide the founder name']
        },
        teamSize: {
            type: Number,
            default: 1,
            min: 1
        }
    },
    documents: {
        businessLicense: {
            type: String,
            required: [true, 'Please upload your business license']
        },
        nationalId: {
            type: String,
            required: [true, 'Please upload your national ID']
        },
        businessProposal: {
            type: String,
            required: [true, 'Please upload your business proposal']
        },
        additionalDocs: [String]
    },
    financials: {
        annualRevenue: {
            type: String,
            default: 'Not specified'
        },
        fundingStage: {
            type: String,
            enum: ['pre-seed', 'seed', 'series-a', 'series-b', 'series-c', 'growth'],
            default: 'pre-seed'
        },
        fundingNeeded: {
            type: Number,
            min: 0
        }
    },
    metrics: {
        accomplishments: [String],
        keyFeatures: [String],
        valueProposition: { type: String }
    },
    status: {
        isActive: {
            type: Boolean,
            default: true
        },
        subscriptionTier: {
            type: String,
            enum: ['free', 'premium', 'enterprise'],
            default: 'free'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Indexes for better query performance
startUpSchema.index({ industry: 1 });
startUpSchema.index({ 'financials.fundingStage': 1 });
startUpSchema.index({ name: 'text', description: 'text' });

const Startup = mongoose.model('Startup', startUpSchema);

module.exports = Startup;
