const mongoose = require("mongoose")
const express = require("express")
const app = express()

const DbConn=(MONGO_URL)=>{
    mongoose.connect(MONGO_URL,{useNewUrlParser:true}).then(()=>{
        console.log("COnnected to mongoDb")
        
    }).catch((er)=>{
        console.log(er.message)
    })    
}

module.exports = DbConn