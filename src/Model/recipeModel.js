const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    benefits:{
        type:String,
        required:true
    },
    ingredients:{
        type:[String],
        required:true
    },
    timeTakenToMake:{
        type:String,
        required:true
    },
    bestTimeToConsume:{
        type: String,
        required: true,
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    link:{
        required:true,
        type:String
    }
},{timestamps:true})
module.exports = mongoose.model("recipe",recipeSchema)