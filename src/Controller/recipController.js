const recipeModel = require("../Model/recipeModel")
const { isValidRequestBody,isValid} = require("../Util/validations")

const createRecipeDetail = async function (req,res){
    try{
        let {name,benefits,timeTakenToMake,ingredients,bestTimeToConsume}= req.body
       
        let recipe =await recipeModel.create(req.body)
        return res.status(200).send({status:true,recipe:recipe})

    }
    catch(er){
        return res.status(500).send(er.message)
    }
}

const recipeDetail = async function (req,res){
    try{
        let userId= req.head
        let recipe = await recipeModel.find()
        if(recipe.length==0){
            return res.status(404).send("There is no recipe")
        }
        return res.status(200).send({status:true,recipe:recipe})
    }
    catch(er){
        return res.status(500).send(er.message)
    }
}
module.exports ={createRecipeDetail,recipeDetail}