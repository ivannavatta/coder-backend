const addCommission = require("../utils/add-commission.util")

class NewProductDto{
    constructor(newProductInfo){
        this.name = newProductInfo.name
        this.description = newProductInfo.description
        this.price = addCommission(newProductInfo.price) 
        this.thumbnail = newProductInfo.thumbnail
        this.stock = newProductInfo.stock
        this.createAt =  new Date()
        this.updateAt = new Date()
        this.deleteAt = new Date()
    }
}

module.exports = NewProductDto