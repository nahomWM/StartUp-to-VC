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
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

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
