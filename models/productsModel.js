const moongoose = require("mongoose");


const Products = moongoose.model("Product",{

 productName : {type : String},
 description :{type :String},
 price : {type:Number},
 qty : {type: String},
 imageUrl: { type: String,}


})


module.exports = {Products}