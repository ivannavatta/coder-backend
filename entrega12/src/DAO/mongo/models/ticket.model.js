const mongoose = require('mongoose')
const ticketSchema = require('../schemas/ticket.schema')

const ticketCollection = 'ticket'

const Ticket = mongoose.model(ticketCollection, ticketSchema)

module.exports = Ticket