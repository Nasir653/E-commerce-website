
const mongoose = require("mongoose");


const User = mongoose.model("user", {

  username: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  profileImg: { type: String },

  cart: [
    {

      productName: { type: String },
      description: { type: String },
      price: { type: Number },
      qty: { type: String },
      imageUrl: { type: String }

    }

  ]


  
   });


   module.exports = { User };
 
