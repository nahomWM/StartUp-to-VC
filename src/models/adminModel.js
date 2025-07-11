const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide admin name']
    },
    permissions: [{
        type: String,
        enum: ['manage_users', 'manage_startups', 'manage_vcs', 'manage_admins', 'view_analytics', 'system_settings']
    }],
    level: {
        type: String,
        enum: ['super_admin', 'moderator', 'support'],
        default: 'moderator'
    },
    lastLogin: Date,
    activityLog: [{
        action: String,
        target: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        details: mongoose.Schema.Types.Mixed
    }],
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
