const multer = require('multer');
const AppError = require('./AppError');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = 'uploads/others';
        if (file.fieldname === 'businessLicense' || file.fieldname === 'nationalId') {
            dest = 'uploads/documents';
        } else if (file.fieldname === 'businessProposal') {
            dest = 'uploads/proposals';
        } else if (file.fieldname === 'accomplishments') {
            dest = 'uploads/accomplishments';
        }
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user ? req.user.id : 'anon'}-${Date.now()}.${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new AppError('Not a supported file type! Please upload images, videos, or PDFs.', 400), false);
    }
};
