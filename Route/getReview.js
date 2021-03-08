const express=require('express')
const { resModel } = require('../Database/models')
const Route=express.Router()

    Route.get('/getReview',async(req,res)=>{
        if(req.query){
            try{
                const result=await resModel.findById(req.query.id).populate('positiveReview negativeReview')
                // res.json(result)
                res.render('getReview',{res:result});
            }catch(e){
                console.log(e);
                res.send('Crashed')
            }
        }
    })

module.exports=Route
