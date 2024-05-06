
const passport = require("passport");

function authenticateJWT(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }
    req.user = user
    next()
  })(req, res, next);
}

module.exports = authenticateJWT