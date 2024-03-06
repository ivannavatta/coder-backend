function redirectToLogin(req, res, next) {
    // Verificar si el usuario está autenticado
    if (!req.user) {
   console.log(req.user);
      return res.redirect('/login');
    }
    next();
  }
  

module.exports = redirectToLogin