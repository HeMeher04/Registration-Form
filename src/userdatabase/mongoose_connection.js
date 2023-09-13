const mongoose = require('mongoose');
const users_collection1 = require('./userdata')
mongoose.connect('mongodb://127.0.0.1:27017/myuserdata')
.then(()=>{console.log("Mongoose connection sucess")})
.catch((error)=>{console.log(error)})