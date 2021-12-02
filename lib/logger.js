const { createLogger, format, transports, addColors } = require('winston');
const {
  Syslog,
} = require('winston-syslog'); /* Exposing `winston.transports.Syslog` */

const { combine, timestamp, printf } = format;

addColors({
  info: 'blue',
  warn: 'yellow',
  error: 'red',
  debug: 'green',
});

const myFormat = printf(({ level, message, label, timestamp }) => {
  // [${level.toUpperCase()}]
  return `${timestamp} ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({
      level: ['debug'],
      format: format.combine(format.colorize({ all: true })),
    }),
    new transports.Syslog({
      app_name: 'naught',
    }),
  ],
});

module.exports = logger;
