const Stripe = require('stripe')
class PaymentService {
    constructor(){
        this.stripe = new Stripe('sk_test_51PJKfF09PY8JuRT20NeZSyqFOXdmXmYRQpSEuAg6oRJB5w9gtsoA2jo0SKQ7f0mLS1o5Fe2hh5yW7I0eloHn1INx00oTxiOXts')
    }

    async createPaymentInfo(data) {
        console.log("🚀 ~ PaymentService ~ createPaymentInfo ~ data:", data)
        return this.stripe.paymentIntents.create(data)
    }
}

module.exports = PaymentService