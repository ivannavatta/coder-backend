const NewUserDto = require('../DTOs/new-user.dto')
const userStore = require('../stores/users.store')


const getAll = async () => {
    return await userStore.getAll()
}

const create = async (newUser, password) => {
    const { first_name, last_name, email } = newUser

    if (!first_name || !last_name || !email || !password) {
        throw new Error('Bad request: Missing required fields');
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

const updated = async (id, updated) => {
    const { name, price, stock, description } = updated;
    if (!name || !price || !stock || !description) {
        throw new Error('Bad request: Missing required fields');
    }

    const existingUser = await userStore.findById(id)

    if(!existingUser || !existingUser.status){
        throw new Error('Bad request: User not found or is not active');
    }
    const UserUpdated = new UpdateUser(updated)
    return await userStore.updated(id, UserUpdated)
}

const deleted = async (id, status, deleteAt) => {
   
    return await UsersStore.deleted(id, status, deleteAt)
}

module.exports = {
    getAll,
    create,
    find,
    findById,
    updated,
    deleted
}