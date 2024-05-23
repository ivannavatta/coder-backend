class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    async getAll(){
        return await this.dao.getAll()
    }

    async create(newProductInfo){
        return await this.dao.create(newProductInfo)
    }
    async find(firstParameter, secondParameter){
        
        return await this.dao.find(firstParameter, secondParameter)
    }
    async findById(id){
        return await this.dao.findById(id)
    }
    async updated(id, updated){
        return await this.dao.updated(id, updated)
    }
    async deleted(id, status){
        return await this.dao.deleted(id, status)
    }
    async checkStock (product){
        return await this.dao.checkStock(product)
    }
}

module.exports = ProductRepository