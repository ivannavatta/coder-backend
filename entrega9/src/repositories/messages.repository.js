class MessageRepositoy{
    constructor(adapter){
        this.adapter = adapter
    }

    async sendMessage(messageInfo){
       return await this.adapter.sendMessage(messageInfo)
    }
}

module.exports = MessageRepositoy