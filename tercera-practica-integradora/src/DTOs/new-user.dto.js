const { createHash } = require("../utils/crypt-password.util")

class NewUserDto{
    constructor(newUserInfo, password){
        this.first_name = newUserInfo.first_name
        this.last_name = newUserInfo.last_name
        this.email = newUserInfo.email
        this.password = createHash(password)
        this.createAt =  new Date()
        this.updateAt = new Date()
        this.deleteAt = new Date()
    }
}

module.exports = NewUserDto