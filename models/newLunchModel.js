const mongoose = require("mongoose");


const LunchImgs = mongoose.model("LunchImg",{
    imageUrl:{type: String, required : true}
})



module.exports = LunchImgs;