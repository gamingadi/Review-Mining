const mongoose=require('mongoose')

const ResSchema=mongoose.Schema({
    name:String,
    address:String,
    opening:String,
    closing:String,
    contact:String,
    img:String,
    rating:Number,
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews"
    }]
})
const RevSchema=mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    Uname:String,
    review:String,
    email:String,
    resturent:String,
    img:String,
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    }
})
const resModel=mongoose.model('resturent',ResSchema)
const revModel=mongoose.model('reviews',RevSchema)
module.exports={resModel,revModel}