const Sentiment=require('sentiment')
const sentiment=new Sentiment()
function isPositive(text){
    const token=sentiment.analyze(text)
    if(token.score<0){
        return false
    }else{
        return true;
    }
}
// let review="Its not bad"
// let push=isPositive(review)?({review:{positiveReview:review}}):({review:{negativeReview:review}});
// console.log(push);
module.exports=isPositive