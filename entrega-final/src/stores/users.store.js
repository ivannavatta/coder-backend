const UserDao = require("../DAO/mongo/user-mongo.dao");

const User = new UserDao()

const getAll = async () => {
    const users = await User.getAll()
    return users
}

const create = async (newUserInfo) => {
    const newUser = await User.create(newUserInfo)
    return newUser
}

const find = async (uid) => {
    const user = await User.find(uid)
    return user
}

const findById = async (uid) => {
    const user = User.findById(uid)
    return user
}

const updated = async (uid, updated) => {
    await User.update(uid, updated)
    return 'User updated'
}

const deleted = async uid => {
   return await User.delate(uid)
}

const findInactiveUsers = async (cutoffDate) => {
    return await User.findInactive(cutoffDate)
}

const updateMany = async (filter) => {
    
    return await User.updateMany(filter)
    
}
module.exports = {
    getAll,
    create,
    find,
    findById,
    updated,
    deleted,
    findInactiveUsers,
    updateMany
}