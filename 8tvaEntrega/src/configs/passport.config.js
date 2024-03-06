const passport = require('passport')
const local = require('passport-local')
const jwt = require('passport-jwt')
const cookieExtractor = require('../utils/cookie-extractor.util')
const GithubStrategy = require('passport-github2')
const { createHash, useValidPassword } = require('../utils/crypt-password.util')
const { ghClientID, ghClientSecret } = require('./github.config')
const Users = require('../DAO/mongo/models/user.model')
const Cart = require('../DAO/mongo/models/cart.model')

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback: true, usernameField: 'email'},
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, email } = req.body
                if(!first_name || !last_name || !email || !password) return res.status(400).json({ status: 'error', error: 'Bad request'})
                const user = await Users.findOne({email: username})
                if(user){
                     console.log('User exists');
                     return done(null, false)
                } 
                
                const newUserInfo = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                }
                const newUser = await Users.create(newUserInfo)
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
                const user = await Users.findOne({ email: username})

                if(!user) {
                    console.log('El usuario no existe');
                    return done(null, false)
                }

                if(!useValidPassword(user, password)) {
                    console.log('La contrasenia no es correcta');
                    return done(null, false)
                }

                return done(null, user)
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
                console.log('profile:',profile)
      
                const { id, login, name, email } = profile._json
      
                const user = await Users.findOne({ email: email })
                if (!user) {
                  const newUserInfo = {
                    first_name: name,
                    email,
                    githubId: id,
                    githubUsername: login,
                  }
      
                  const newUser = await Users.create(newUserInfo)
                  return done(null, newUser)
                }
      
                return done(null, user)
            } catch (error) {
                return done(error)
            }
           
          }
    ))

    passport.serializeUser((user, done) =>{
        console.log('el usario:',user);
        return done(null, user._id)
    })

    passport.deserializeUser(async (id, done) =>{
        
        const user = await Users.findById(id)
        return done(null, user)
    })
}

module.exports = initializePassport