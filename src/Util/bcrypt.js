const bcrypt = require("bcrypt");

const hassPassWord=async(password)=>{
    try {
        const saltRounds = 10;
      const hasspassword = await bcrypt.hash(password, saltRounds);
      return hasspassword;
        
    } catch (error) {
       res.status(500).send({status:false,message:"hashpassword error"})
    }
}

// /=======================================================
const comparePassword = async (password, hashpassword) => {
  return bcrypt.compare(password, hashpassword);
};

module.exports = { hassPassWord, comparePassword };