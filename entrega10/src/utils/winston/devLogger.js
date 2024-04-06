const winston = require('winston')
const customWinston = require('./custom.winston')

const logger = winston.createLogger({
    levels: customWinston.levels,
    transports: [ new winston.transports.Console({ level: 'debug' })],
    format: winston.format.combine(
        winston.format.colorize({ colors: customWinston.colors}),
        winston.format.simple(),
      )
})


module.exports = logger