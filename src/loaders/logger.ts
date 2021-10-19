import {LOGS_LEVEL} from '../config';
import winston from 'winston';

const transports: any = [];

if (process.env.NODE_ENV !== 'development') {
  transports.push(new winston.transports.Console());
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat()
      )
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: LOGS_LEVEL,
  levels: winston.config.npm.levels,
  // transports: [
  //   // new transports.Console(),
  //   new transports.File({
  //     filename: 'logs/app.log'
  //   })
  // ],
  format: winston.format.combine(
    winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    winston.format.align(),
    winston.format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
  transports
});

export default LoggerInstance;
