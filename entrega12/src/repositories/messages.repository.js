class MessageRepositoy{
    constructor(adapter){
        this.adapter = adapter
    }

    async sendMessage(messageInfo){
       return await this.adapter.sendMessage(messageInfo)
    }
    async restartPassword(email, user){
        return await this.adapter.restartPassword(email, user)
    }
}

module.exports = MessageRepositoy