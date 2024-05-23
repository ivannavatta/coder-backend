const Users = require("./models/user.model");

class UserDao {
    async getAll() {
        return await Users.find()
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
        return await Users.updateOne({_id: delateUser}, {status: false}) 
    }
    async findByIdAndUpdate(id) {
        const user = await Users.findByIdAndUpdate(id, {lastConexion: new Date()})
        return user
    }
    async findInactive(cutOffDate){
        return await Users.find({lastConexion: { $lt: cutOffDate }, status: true})
    }

    async updateMany(filter){
       
     return await Users.updateMany(filter, {status: false, deleteAt: new Date()})
   
    }
    
}


module.exports = UserDao