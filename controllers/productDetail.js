const { Products } = require("../models/productsModel");
const { User } = require("../models/userModel");

let eachpro = async (req, res) => {

  try {


    const productId = req.params.id;
    const getPro = await Products.findById(productId).lean();

console.log(getPro);

    if (getPro) {

      res.render("productDetails", { getPro });
     
      const user = await User.findById(req.userId);
      
    
      if (user) {
      
        user.cart.push({
          productName: getPro.productName,
          description: getPro.description,
          price: getPro.price,
          qty: getPro.qty,
          imageUrl: getPro.imageUrl,

        });

        await user.save();
      }

  
     

    }
    
    else {
      res.status(404).send("Product not found");
    }

  }
  
  catch (error) {
    console.error("Error in eachpro function:", error);
    res.status(500).send("Server error");
  }

};

module.exports = { eachpro };
