

class GetUserDto{
    constructor(newUserInfo){
        this.first_name = newUserInfo.first_name
        this.last_name = newUserInfo.last_name
        this.email = newUserInfo.email
        this.rol = newUserInfo.role
    }
}

module.exports = GetUserDto