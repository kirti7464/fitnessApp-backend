const express = require("express")
const router = express.Router()
const {createRecipeDetail,recipeDetail} = require("../Controller/recipController")
const { authenticate } = require("../Middleware/authenticate")

router.post("/create",createRecipeDetail)
router.get("/detail",authenticate,recipeDetail)

router.get("/test",(req,res)=>{
    res.send("testinggg...")
})

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
module.exports = router