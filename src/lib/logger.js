const winston = require('winston');
const fs = require('fs-extra');
const DailyRotateFile = require('winston-daily-rotate-file');
require("dotenv").config();

const logDir = process.env.LOG_DIR || 'logs';
let logger;

// Create the directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const myFormat = winston.format.printf(({
    level,
    message,
    timestamp,
    label,
}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});


logger = (moduleName) => {
    const log = winston.createLogger({
        levels: winston.config.npm.levels,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.label({
                label: moduleName,
            }),
            myFormat,
        ),
        transports: [
            new winston.transports.Console({ level: process.env.LOGGER_LEVEL || 'debug' }),
            new DailyRotateFile({
                filename: 'backend-api-logs-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                frequency: '1m',
                dirname: logDir,
                zippedArchive: false,
                // maxSize: process.env.LOGGER_MAX_FILE_SIZE,
                maxFiles: `${process.env.LOGGER_MAX_FILES}d`,
                auditFile: `${logDir}/auditfile.json`,
                level: process.env.LOGGER_LEVEL || 'debug'
            }),
        ],
    });
    return log;
};

module.exports = logger;
