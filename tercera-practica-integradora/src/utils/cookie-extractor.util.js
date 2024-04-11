const cookieExtractor = req =>{
    if(req && req.cookies){
        const tokenKey = 'authToken'
        const token = req.cookies[tokenKey]
        req.logger.debug('token cookie extractor:',token);

        return token || null
    }
    return null
}

module.exports = cookieExtractor