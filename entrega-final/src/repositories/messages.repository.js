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
    async sendDeletion(emails) {
        return await this.adapter.sendDeletion(emails)
    };
    async sendDeletionProduct(email, productOwner) {
        return await this.adapter.sendDeletionProduct(email, productOwner)
    }
}

module.exports = MessageRepositoy