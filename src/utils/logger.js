import winston from 'winston';

const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'logs/app.log' }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
    ],
});

export default logger;
