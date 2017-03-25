var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'debug',
            timestamp: function() { return (new Date().toLocaleString());},
            filename: 'logFiles/info.log',
            handleExceptions: true,
            json: true,
            maxsize: 1024 * 1024 *5, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            timestamp: function() { return (new Date().toLocaleString());},
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
