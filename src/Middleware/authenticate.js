const jwt = require("jsonwebtoken")
// const { comparePassword } = require("../Util/bcrypt")

const authenticate = async function(req,res,next){
    try{
        let token = req.headers.authorization;
        token=token.replace("Bearer","").trim()
        if(!token){
            return res.status(401).send("access token is not present")
        }
        let decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        // if(!decodedToken)  return res.status(401).send("token does not match")
        req.head=decodedToken.id
        next()
    }
    catch(er){
        return res.status(401).send(er.message)
    }
}
module.exports = {authenticate}