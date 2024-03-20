const passport = require("passport");

const authorization = role => {
    return (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                console.log('Unauthorized');
                return res.json({message: 'Unauthorized'})
            }
            if((role && !role.includes(user.user.role)) ){
                console.log('Forbidden');
                return res.json({message: 'Forbidden'})
            }
            req.user = user
            next()
        })(req, res, next);
    }
}

  
  module.exports = authorization