class UpdateProduct{
    constructor(updatedProduct){
        this.name = updatedProduct.name
        this.price = updatedProduct.price
        this.stock = updatedProduct.stock
        this.thumbnail = updatedProduct.thumbnail
        this.description = updatedProduct.description
        this.updateAt = new Date()
    }
}

module.exports = UpdateProduct