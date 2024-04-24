const { v4: uuidv4 } = require('uuid');
class NewTicketDto{
    constructor(total, user){
        this.code = uuidv4()
        this.amount = total
        this.purchaser = user.email
        this.purchase_datetime = new Date()
    }
}

module.exports = NewTicketDto