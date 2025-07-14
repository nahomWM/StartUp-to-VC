const express = require('express');
const config = require('./src/config/environment');
const connectDB = require('./src/config/database');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const path = require('path');
const AppError = require('./src/utils/AppError');
const authRoutes = require('./src/routes/authRoutes');
const startupRoutes = require('./src/routes/startupRoutes');
const vcRoutes = require('./src/routes/vcRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const logger = require('./src/utils/logger');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Serving static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (config.env === 'development') {
    app.use(morgan('dev'));
}

// Implement CORS
app.use(cors());
app.options('*', cors());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Connect to database
connectDB();

// 2) ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/startup', startupRoutes);
app.use('/api/vc', vcRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Star-Bust API is running...');
});

// 3) UNHANDLED ROUTES
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = config.port || 5000;
app.listen(PORT, () => {
    logger.info(`Server running in ${config.env} mode on port ${PORT}`);
});

process.on('unhandledRejection', err => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    process.exit(1);
});

process.on('uncaughtException', err => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger.error(err.name, err.message);
    process.exit(1);
});
