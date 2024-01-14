import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  level: 'debug',
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
  })
);

logger.add(
  new winston.transports.File({
    filename: 'error.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint()
    ),
    level: 'error',
  })
);

export default logger;
