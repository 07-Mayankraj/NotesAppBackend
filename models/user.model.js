const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    role:String,
    location:String,
    password:String,
    DOB:String


})

const UserModel = mongoose.model("user",userSchema)
module.exports={
    UserModel
}