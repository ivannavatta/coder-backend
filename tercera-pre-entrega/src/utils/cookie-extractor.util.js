const cookieExtractor = req =>{
    if(req && req.cookies){
        const tokenKey = 'authToken'
        const token = req.cookies[tokenKey]
        console.log('token cookie extractor:',token);

        return token || null
    }
    return null
}

module.exports = cookieExtractor