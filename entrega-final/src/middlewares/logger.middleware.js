const loggerFactory = require('../factory/logger.factory')

const logger = (req, res, next) => {
    
    req.logger = loggerFactory
  
    req.logger.http(
      `${req.method} - ${req.url} - ${res.statusCode} / ${
        req.headers['user-agent']
      } - ${new Date().toUTCString()}`
    )
  
    next()
  }

module.exports = logger