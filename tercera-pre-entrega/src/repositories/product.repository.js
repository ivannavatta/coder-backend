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
    async findById(id){
        return await this.dao.findById(id)
    }
    async updated(id, updated){
        return await this.dao.updated(id, updated)
    }
    async deleted(id, status, deleteAt){
        return await this.dao.deleted(id, status, deleteAt)
    }
    async checkStock (product){
        return await this.dao.checkStock(product)
    }
}

module.exports = ProductRepository