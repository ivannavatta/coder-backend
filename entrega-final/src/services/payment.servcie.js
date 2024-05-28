const PaymentService = require("../utils/payment.util")


const paymentIntentInfo = async (data, totalPrice) => {
    const orderDetailsArray = data.map(item => {
        return {
            id: item.id,
            name: item.name,
            quantity: item.quantity
        };
    });

    const obj = {
        amount: Math.round(totalPrice * 100),
        currency: 'usd',
        metadata: {
            userId: 'dhxh287dgiubninuwdho',
            orderDetails: JSON.stringify(orderDetailsArray, null, '\t'),
            address: JSON.stringify({
                street: 'loria 1080',
                zipCode: 1220
            }, null, '\t')
        }
    };

    const service = new PaymentService();
    const result = await service.createPaymentInfo(obj);
    return result;
};

module.exports = { paymentIntentInfo };
