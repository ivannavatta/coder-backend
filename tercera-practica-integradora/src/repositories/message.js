const MessageRepositoy = require("./messages.repository");
const MessageFactory = require('../factory/messages.factory')

const messageManager = new MessageRepositoy(new MessageFactory())

module.exports = messageManager