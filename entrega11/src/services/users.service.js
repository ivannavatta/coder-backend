const NewUserDto = require('../DTOs/new-user.dto')
const CustomError = require('../handlers/errors/Custom-Error')
const { genereteUserErrorInfo } = require('../handlers/errors/cause-error')
const ERRORS_CODE = require('../handlers/errors/enum-errror')
const TYPES_ERRORS = require('../handlers/errors/types-error')
const messageManager = require('../repositories/message')
const userStore = require('../stores/users.store')


const getAll = async () => {
    return await userStore.getAll()
}

const create = async (newUser, password) => {
    const { first_name, last_name, email } = newUser

    if (!first_name || !last_name || !email || !password) {
        CustomError.createError({
            name: TYPES_ERRORS.USER_CREATION_ERROR,
            cause: genereteUserErrorInfo({first_name, last_name, email, password}),
            message: 'Error trying to create user',
            code: ERRORS_CODE.INAVLID_USER_INFO
        })
    }

    const newUserInfo = new NewUserDto(newUser, password)
   
   return  await userStore.create(newUserInfo)

}

const find = async uid => {
    return await userStore.find(uid)
}
const findById = async (id) => {
   const User = await userStore.findById(id)
   return User
}

const updatedOne = async (id, updated) => {
    const userUpdated = userStore.updated(id, updated)

    return userUpdated
}

const sendMessage = async messageInfo => {
    return await messageManager.sendMessage(messageInfo)
}

const restartPassword = async (email, user) => {
    return await messageManager.restartPassword(email, user)
}
const deleted = async (uid) => {
    return await userStore.deleted(uid)
}

module.exports = {
    getAll,
    create,
    find,
    findById,
    updatedOne,
    sendMessage,
    restartPassword,
    deleted
}