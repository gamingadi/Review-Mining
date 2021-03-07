const express = require("express");
const Route = express.Router();
const mongoose = require("mongoose");
const { revModel, resModel } = require("../Database/models");

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
    resModel.updateOne({name:restaurant},{$push:{review:newReview.id}},(err,result)=>{
        if(result.ok){
            console.log(newReview.id);
            res.redirect('/review')
        }else{
            res.send("<a herf='/'>Something Wrong GO BACK</a>")
        }
    })
  });
});

module.exports = Route;
