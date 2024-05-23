const GetUserDto = require('../DTOs/get-user.dto')
const NewUserDto = require('../DTOs/new-user.dto')
const CustomError = require('../handlers/errors/Custom-Error')
const { genereteUserErrorInfo } = require('../handlers/errors/cause-error')
const ERRORS_CODE = require('../handlers/errors/enum-errror')
const TYPES_ERRORS = require('../handlers/errors/types-error')
const lastConexion = require('../middlewares/lastConexion.middleware')
const messageManager = require('../repositories/message')
const userStore = require('../stores/users.store')


const getAll = async () => {
    const allUsers = await userStore.getAll();
    const usersInfo = allUsers.map(user => new GetUserDto(user));
    return usersInfo;
};

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

const getInactiveUsers = async (minutes) => {
    const cutoffDate = new Date();
    cutoffDate.setMinutes(cutoffDate.getMinutes() - minutes); // Calculamos la fecha de corte

    const inactiveUsers = await userStore.findInactiveUsers(cutoffDate);
    console.log("🚀 ~ getInactiveUsers ~ inactiveUsers:", inactiveUsers)
    return inactiveUsers;
};

const deleteInactiveUsers = async (minutes) => {
    const inactiveUsers = await getInactiveUsers(minutes);
    
    const emails = inactiveUsers.map(user => user.email);

    // Eliminar usuarios inactivos
    const filter = { lastConexion: { $lt: new Date(Date.now() - minutes * 60 * 1000) } }
    await userStore.updateMany(filter);
   
    // Enviar correos de notificación
     await messageManager.sendDeletion(emails);

    return inactiveUsers;
};



module.exports = {
    getAll,
    create,
    find,
    findById,
    updatedOne,
    sendMessage,
    restartPassword,
    deleted,
    deleteInactiveUsers
}