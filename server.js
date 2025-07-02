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
const errorHandler = require('./src/middleware/errorHandler');

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

app.get('/', (req, res) => {
    res.send('Star-Bust API is running...');
});

app.use(errorHandler);

const PORT = config.port || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${config.env} mode on port ${PORT}`);
});
