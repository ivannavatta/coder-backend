const jwt = require('jsonwebtoken')

const secret = 'mySecret'

const generateToken = user => {
    return jwt.sign({user}, secret, {expiresIn: '1h'})
}

const authToken = (req, res, next) => {
    const headerToken = req.headers.authorization
    
    if(!headerToken) return res.status(401).json({ error: 'Unauthorized'})
    const token = headerToken.split(' ')[1]

    jwt.verify(token, secret, (err, credentials) => {
        if(err) return res.status(401).json({ error: 'Unauthorized'})

        console.log("credentials:",credentials);

        req.user = credentials.user
        console.log(req.user);
        next()
    })
}

module.exports = {
    generateToken,
    authToken
}