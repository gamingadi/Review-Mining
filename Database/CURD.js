const mongoose = require("mongoose");
function connect() {
  let connected = false;
  if (!connected)
    mongoose
      .connect("mongodb://127.0.0.1:27017/resturent", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((err) => {
        if (!err) connected = true;
        return connected;
      })
      .catch((err) => {
        console.log(`Not able to Connect to mongoDB`);
      });
  return connected;
}
function CreateModel(modelName,Schema){
    return Model=mongoose.Schema(modelName,Schema);
}
function CreateDoc(model,data,save,fun){
    const doc=new model(data);
    if(save)
        doc.save((result,err)=>{
            fun(result,err);
        })
    return doc
}
async function findDoc(model,Query){
    return await model.find(Query) //Use in Try Catch
}
function deleteDoc(model,Query,data,fun){
    model.updateOne(Query,{$pull:data},(err,result)=>{
        fun()
    })
}
module.exports={connect, CreateModel,CreateDoc,findDoc}