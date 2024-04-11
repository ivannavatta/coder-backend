const passport = require("passport");

const authorization = role => {
    return (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                req.logger.info('Unauthorized');
                return res.status(401).json({message: 'Unauthorized'})
            }
            if((role && !role.includes(user.user.role)) ){
                req.logger.info('Forbidden');
                return res.status(403).json({message: 'Forbidden'})
            }
            req.user = user
            next()
        })(req, res, next);
    }
}

  
  module.exports = authorization