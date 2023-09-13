const express =require('express')
const bodyparser = require('body-parser')
const path = require('path')
const port = 8000;
const users_collection1 = require('./userdatabase/userdata')
require("./userdatabase/mongoose_connection")

const app=express()

const bcrypt = require('bcrypt')


app.use(bodyparser.urlencoded({
        extended : true
    })
)

app.use(express.json());


let mainfolder = path.join(__dirname,"../");

//make all main folder file static ie. can be displayed
app.use(express.static(mainfolder))

// const hashedpassword = async(password)=>{
//     const hashkey = await bcrypt.hash(password,10);
//     return hashkey;
// }

app.get('/',(req,res)=>{
    res.send("Home Page");
    console.log(mainfolder);
})

app.get('/register',(req,res)=>{
    res.sendFile(mainfolder+"/register.html")
})

app.get('/login',(req,res)=>{
    res.sendFile(mainfolder+"/login.html")
})

app.post('/register',(req,res)=>{
    
    let req_userdata= new users_collection1(req.body);
    // check pass==confirm_pass
    if(req_userdata.Password == req_userdata.Confirm_Password)
    {
        // save in database
        req_userdata.save();

        res.send(req_userdata);
    }
    else{
        res.send("Password Not Matching");
    }
    
})

app.post('/login',async(req,res)=>{
    // getting data from body
    let usermail = req.body.Email;
    let userpassword =req.body.Password;
    // let mykey_password = await hashedpassword(userpassword)
    // console.log(mykey_password);
    //check in db
    let req_userdata = await users_collection1.findOne({Email:usermail});
    if(req_userdata !=null){
        //res.send("<h1>Welcome", ${req.req_userdata.Name}</h1>)
        const bcrypt_pass=await bcrypt.compare(userpassword,req_userdata.Password)
        if(bcrypt_pass == true){
            //res.send("<h1>Sucessfully LoggedIN</h1>")
            res.send("<h1>Sucessfully LoggedIN</h1>"+req_userdata);
        }
        else{
            res.send("<h1>Incorrect Password</h1>");
        }
        
    }
    else{
        res.send("Email does not Exist");
    }


})

app.listen(port,()=>{
    console.log(`listining on port ${port}`)
})