class NewTokenDto{
    constructor(newTokenInfo){
        this.id = newTokenInfo.id
        this.email = newTokenInfo.email
        this.first_name = newTokenInfo.first_name
        this.last_name = newTokenInfo.last_name
        this.role = newTokenInfo.role
    }
}

module.exports = NewTokenDto