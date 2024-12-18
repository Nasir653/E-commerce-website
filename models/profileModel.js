const mongoose = require("mongoose");


let Profile = mongoose.model("profile",{

 name :{type:String},
 about:{type:String}

});


module.exports = {Profile};