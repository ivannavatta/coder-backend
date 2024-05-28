const passport = require('passport')
const local = require('passport-local')
const jwt = require('passport-jwt')
const cookieExtractor = require('../utils/cookie-extractor.util')
const GithubStrategy = require('passport-github2')
const { useValidPassword } = require('../utils/crypt-password.util')
const { ghClientID, ghClientSecret } = require('./github.config')
const userServices = require('../services/users.service')

const Cart = require('../DAO/mongo/models/cart.model')
const User = require('../DAO/mongo/models/user.model')
const { generateToken } = require('../utils/jwt.util')
const NewTokenDto = require('../DTOs/new-token.dto')
const loggerFactory = require('../factory/logger.factory')

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email', session: false},
        async (req, username, password, done) => {
            try {
                const user = await userServices.find({email: username})
                
                if(user){
                    req.logger.info('User exists');
                     return done(null, false, { message: 'Email already exists' })
                } 
                
                const newUser = await userServices.create(req.body, password)
                //crear carrito a un usario
                const newCart = await Cart.create({ user: newUser._id })
                newUser.cart = newCart._id
                
                await newUser.save()

                return done(null, newUser)
            } catch (error) {
                return done(error)
            }
        }
    ) )

    passport.use('login', new LocalStrategy(
        {usernameField: 'email', session: false},
        async (username, password, done) => {
            try {
                const user = await userServices.find({email: username, status: true})
                if(!user) {
                    loggerFactory.info('El usuario no existe');
                    return done(null, false)
                }

                if(!useValidPassword(user, password)) {
                    loggerFactory.info('La contrasenia no es correcta');
                    return done(null, false)
                }
                const userToken = new NewTokenDto(user)
            
                const token = generateToken(userToken)
                
                return done(null, token)
            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.use('jwt', new JWTStrategy(
        {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: 'mySecret'
    }, (jwt_payload, done) => {
        try {
            loggerFactory.debug('jwt_payload', jwt_payload);
            done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('github', new GithubStrategy(
        {clientID: ghClientID,
        clientSecret: ghClientSecret,
        callbackURL: 'http://localhost:3001/auth/githubcallback'},
        async (accessToken, RefreshToken, profile, done) => {
            try {
                const { id, login, name, email } = profile._json
      
                const user = await userServices.find({email: email})
                if (!user) {
                  const newUserInfo = {
                    first_name: name,
                    email,
                    githubId: id,
                    githubUsername: login,
                  }
      
                  const newUser = await User.create(newUserInfo)
                  
                  return done(null, newUser)
                }
                const token = generateToken(user)
                loggerFactory.debug('token:',token);
      
                return done(null, token)
            } catch (error) {
                return done(error)
            }
           
          }
    ))

    passport.serializeUser((user, done) =>{
        loggerFactory.debug('el usario:',user);
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        const user = await userServices.findById(id)
        return done(null, user)
    })
}

module.exports = initializePassport