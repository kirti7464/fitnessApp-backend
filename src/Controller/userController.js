const userModel = require("../Model/userModel")
const { hassPassWord, comparePassword } = require("../Util/bcrypt")
const jwt = require("jsonwebtoken")
const { isValidRequestBody, isValidPass ,isValid,isValidEmail,isValidMobileNum} = require("../Util/validations")

const createUser = async function(req,res){
    
    try{
        let {name,email,password,phone} = req.body
        if(!isValidRequestBody(req.body)){
            return res.status(400).send("Please provide data in for registering user")
        }
          if(!name ){
            return res.status(400).send("Please provide name")
        }
        if(!isValid(name) || name.length<3){
            return res.status(400).send("Please provide valid name")
        }
        if(!email ){
            return res.status(400).send("Please provide email")
        }
        if(!isValidEmail(email) ){
            return res.status(400).send("Please provide valid email")
        }
        let dupliEmail = await userModel.findOne({email:email})
        if(dupliEmail){
            return res.status(400).send("Please provide unregistered email")
        }
        if(!phone ){
            return res.status(400).send("Please provide phone")
        }
        if(!isValidMobileNum(phone)){
            return res.status(400).send("Please provide valid contact number")
        }
        let dupliPhone = await userModel.findOne({phone:phone})
        if(dupliPhone){
            return res.status(400).send("Please provide unregistered phone number")
        }
        if(!password ){
            return res.status(400).send("Please provide password")
        }
        if(!isValidPass(password)){
            return res.status(400).send("Password requires 8+ characters, lowercase, uppercase, digit, special character")
        }
        const hasspassword=await hassPassWord(password)
        let user =await userModel.create({name,email ,password:hasspassword,phone })
        const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).send({id:user._id,token:token})
    }
    catch(er){
        return res.status(500).send(er.message)
    }
    
}
const loginUser =async function (req,res){
    try{
        let {email,password} = req.body
        if(!email ){
            return res.status(400).send("Please provide email for logging in")
        }
        if(!isValidEmail(email)){
            return res.status(400).send("Please provide email in correct format")
        }
        
        let user = await userModel.findOne({email:email})
        if(!user){
            return res.status(401).send("There is no user with this email")
        }
        if(!password){
            return res.status(400).send("Please provide password for logging in")
        }
        if(!isValidPass(password)){
            return res.status(400).send("Incorrect password")
        }
        const passwordStatus = await comparePassword(password,user.password)
        if(!passwordStatus) return res.status(401).send("Incorrect password")
        const token = jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:"1d"})
        return res.status(200).send({id:user._id,token:token})
    }
    catch(er){
        return res.status(500).send(er.message)
    }
}
module.exports ={createUser,loginUser}
