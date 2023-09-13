const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const users_schema1 = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        lowercase:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:Number,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Confirm_Password:{
        type:String,
        required:true
    }
})

// Save krna ka just pahala hashed pass(during registration)
users_schema1.pre('save',async function(next){
    this.Password= await bcrypt.hash(this.Password,10)
    this.Confirm_Password= await bcrypt.hash(this.Confirm_Password,10)
})

const users_collection1= new mongoose.model('users_collection1',users_schema1)

module.exports = users_collection1;