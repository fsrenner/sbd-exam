  // Node modules requires
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

// local requires
const config = require('./config');
const logRequests = require('./helpers/logRequests');
const extractToken = require('./helpers/extractToken');
const parseToken = require('./helpers/parseToken');
const reverseMac = require('./helpers/reverseMac');

// Global functions
const app = express();
const Logger = config.logger;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(compression());

// API request logging for debugging issues
app.use('/', (req, res, next) => {
    logRequests(req, res, next);
});

// Set up unauthenticated route for a server health check
app.get('/status', (req, res) => {
    return res.json({
        message: 'Stanley Black & Decker Exam API is running',
        request: 'status',
        method: req.method,
        success: true,
        status: 200
    });
});

// Authenticated API route
app.get('/reverse-mac', (req, res) => {
    const macs = req.body.macs;
    if (!macs || !Array.isArray(macs)) {
        return res.status(400).json({
            error: 'The macs parameter was not passed or was not sent as an array'
        });
    }

    // If the bearer token is not provided in the request, return a 401 status and error message
    const token = extractToken(req);
    if (!token) {
        return res.status(401).json({
            error: 'The authentication bearer token was not provided with the request'
        });
    }

    // If the bearer token provided in the request is not valid, return a 401 status and error message
    const isTokenValid = parseToken(token);
    if (!isTokenValid) {
        return res.status(401).json({
            error: 'You are not authorized to access this endpoint: invalid authentication token'
        });
    }

    const reversedMacs = reverseMac(macs);
    return res.json(reversedMacs);
});

app.listen(config.port, config.host, (err) => {
    if (err) {
        throw new Error(err);
    }
    Logger.info(`Server listening at ${config.host}:${config.port}`)
});

module.exports = app;