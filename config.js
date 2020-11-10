const bunyan = require('bunyan');

// These are the global config exports for the application
module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    logger: bunyan.createLogger({
        name: 'sbd-exam',
        level: process.env.LEVEL || 'debug'
    })
};