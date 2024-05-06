

// Middleware para verificar si el tiempo de sesión ha expirado
function sessionTimeout(req, res, next) {
    const hourInMilliseconds = 60 * 60 * 1000; // 1 hora en milisegundos
    const currentTime = new Date().getTime();
    const sessionStartTime = req.session.startTime || currentTime;

    if (currentTime - sessionStartTime > hourInMilliseconds) {
        // Si ha pasado más de una hora, redirige a la página de inicio de sesión
        return res.redirect('/login');
    } else {
        // Si no ha pasado una hora, actualiza el tiempo de inicio de sesión y continúa
        req.session.startTime = currentTime;
        next();
    }
}

module.exports = sessionTimeout
