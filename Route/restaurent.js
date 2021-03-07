const express=require('express');
const model=require('../Database/models')
const Route=express.Router()

Route.get('/restaurent',(req,res)=>{
   res.render("restaurent",{saved:false})
})
Route.post('/restaurent',async(req,res)=>{
   const {restaurant,img,address,opening,closing,rating,contact}=req.body
   const NewDoc=new model.resModel({
      name:restaurant,
      address:address,
      opening:opening,
      closing:closing,
      contact:contact,
      img:img,
      rating:rating,
   })
  await NewDoc.save((err)=>{
      if(err){
      console.log(err);
      return res.render('restaurent',{saved:false})
      }else{
         console.log("Saved");
         return res.render('restaurent',{saved:true})
      }
   })
})
module.exports=Route;