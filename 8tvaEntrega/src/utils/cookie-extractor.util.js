const cookieExtractor = req =>{
    if(req && req.cookies){
        const tokenKey = 'authToken'
        const token = req.cookies[tokenKey]

        return token || null
    }
    return null
}

module.exports = cookieExtractor