const UserDao = require("../DAO/mongo/user-mongo.dao")
const User = new UserDao()

const lastConexion = async (req, res, next) => {
  if(req.user) {
  await User.findByIdAndUpdate(req.user.user.id, {lastConexion: new Date()})
  }
 
  next()
}

module.exports = lastConexion