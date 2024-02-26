function redirectToLogin(req, res, next) {
    // Verificar si el usuario está autenticado
    if (!req.user) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      return res.redirect('/login');
    }
    // Si el usuario está autenticado, continuar con la siguiente middleware o ruta
    next();
  }
  

module.exports = redirectToLogin