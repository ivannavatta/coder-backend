const Users = require("./models/user.model");

class UserDao {
    async getAll(firtsParameter, secondParameter) {
        return await Users.find(firtsParameter, secondParameter)
      }
    async create(firtsParameter, secondParameter){
        return await Users.create(firtsParameter, secondParameter)
    }
    async update(firtsParameter, secondParameter){
        return await Users.updateOne(firtsParameter, secondParameter)
    }
    async find(firstParameter, secondParameter){
        
        return await Users.findOne(firstParameter, secondParameter)
    }
    async findById(firtsParameter, secondParameter){
        return await Users.findById(firtsParameter, secondParameter)
        
    }
    async delate(delateUser){
        return await Users.deleteOne(delateUser) 
    }
    
}


module.exports = UserDao