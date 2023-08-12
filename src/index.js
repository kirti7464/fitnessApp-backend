const express = require("express")
const app = express()
const DbConn = require("./db")
const  recipeRoute  = require("./Route/recipeRoute")
const  userRoute  = require("./Route/userRoute")
const cors = require('cors');
require("dotenv").config()

const {MONGO_URL,PORT}=process.env
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))

DbConn(MONGO_URL)

app.use("/recipe",recipeRoute)
app.use("/user",userRoute)


app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

