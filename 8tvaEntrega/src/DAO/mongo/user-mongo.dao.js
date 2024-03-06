const Users = require("./models/user.model");

class userDao {
    async getAllDao(firtsParameter, secondParameter) {
        return await Users.find(firtsParameter, secondParameter)
      }
    async createOneDao(firtsParameter, secondParameter){
        return await Users.create(firtsParameter, secondParameter)
    }
    async updateOneDao(firtsParameter, secondParameter){
        return await Users.updateOne(firtsParameter, secondParameter)
    }
    async findUser(firstParameter, secondParameter){
        console.log('enconrado desde el dao');
        return await Users.findOne(firstParameter, secondParameter).populate('carts.cart');
    }
    async findByIdDao(firtsParameter, secondParameter){
        return await Users.findById(firtsParameter, secondParameter)
        
    }
    async delateOneDao(delateProduct){
        return await Users.deleteOne(delateProduct) 
    }
    
}


module.exports = userDao