//Intializations
const express=require('express')
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser');
const PORT=process.env.PORT||3000
const restaurent=require('./Route/restaurent');
const review=require('./Route/review');
const Mongoose = require('mongoose');
const {resModel}=require('./Database/models')
const getReview=require('./Route/getReview')
//Middlewares
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.set('view engine',"ejs")


//Connecting To DB
Mongoose.connect("mongodb://127.0.0.1:27017/resturent", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
     console.log('DB CONNECTED');
}).catch((err) => {
  console.log(`Not able to Connect to mongoDB`);
  console.log(err);
});
//Routes
app.use(restaurent)
app.use(review)
app.use(getReview)

app.get('/',async(req,res)=>{
    resModel.find({}).populate('positiveReview','negativeReview').exec((err,result)=>{
        if(!err){
        res.render("index",{result:result})
        }
    })
})
app.post('/',(req,res)=>{
    const {search,value}=req.body
    let Query={}
    switch(search){
        case "name":
            Query={
                name:value
            }
            break;
        case "address":
            Query={
                address:{$regex:value,$options:"$i"}
            }
        break;
        default:
            Query={}
            break;
    }
    resModel.find(Query,(err,results)=>{
        console.log(results);
        if(results)
        res.render('index',{result:results});
    })
   
})


app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})