const { Products } = require("../models/productsModel");
const { User } = require("../models/userModel");


const carts = async (req,res)=>{


    let getCarts = await User.findById(req.userId).lean();

    console.log(getCarts);
   
    if (getCarts){
        
        res.render("cart", { getCarts : getCarts.cart});
        console.log(getCarts);
        
    }


}


const deleteFromCart = async (req, res) => {
    

    try {

        let getUser = await User.findByIdAndDelete(req.userId)

        console.log(getUser);

        if (getUser) {
            
        }
        




        
    } catch (error) {
        res.status(500).json("server error");
        console.log("Server error");
        
    }




}


    module.exports = carts;