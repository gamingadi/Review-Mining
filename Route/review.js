const express = require("express");
const Route = express.Router();
const mongoose = require("mongoose");
const { revModel, resModel } = require("../Database/models");
const opinion=require('../middleware/sentiment')

Route.get("/review", (req, res) => {
  resModel.find({}, "name", (err, result) => {
    if (!err) {
      req.result = result;
      return res.render("review", { Isaved: false, name: result }); //using for displaing alert on front-end
    } else {
      res.send("Database Error");
    }
  });
});
Route.post("/review", (req, res) => {
  console.log(req.body);
  const { restaurant, Fname, Lname, email, review, img, rating } = req.body;
  let FullName = Fname + " " + Lname;

  const newReview = revModel({
    _id: new mongoose.Types.ObjectId(),
    Uname: FullName,
    review: review,
    email: email,
    resturent: restaurant,
    img: img,
    rating: rating,
  });
  newReview.save(async(err,result)=>{
    let push=opinion(review)?({$push:{positiveReview:newReview.id}}):({$push:{ negativeReview:newReview.id}});
    resModel.updateOne({name:restaurant},push,(err,result)=>{
        if(result.ok){
            console.log(newReview.id);
            console.log(result);
            res.redirect('/review')
        }else{
          console.log(err);
            res.send("<a herf='/'>Something Wrong GO BACK</a>")
        }
    })
  });
});

module.exports = Route;
