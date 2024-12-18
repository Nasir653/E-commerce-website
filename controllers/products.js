const LunchImgs = require("../models/newLunchModel");
const { Products } = require("../models/productsModel");
const cloudinary = require('./cloudnary');
const fs = require('fs');



const allPro = async (req, res) => {


    try {

        console.log(req.file);
        
        const result1 = await cloudinary.uploader.upload( req.file.path, { folder: 'products' });

      
        const newProduct = new Products({

            productName: req.body.productName,
            description: req.body.description,
            price: req.body.price,
            qty: req.body.qty,
            imageUrl: result1.secure_url,

        });

           await newProduct.save();

       
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error("Error in allPro: ", error);
        res.status(500).json({ error: 'Failed to create product and upload images', details: error.message });
    }
};


let Launched = async (req, res) => {


    try {

      
        if (!req.file || req.file.length === 0) {

            return res.status(400).json({ error: 'Image is required' });

        }


        const result2 = await cloudinary.uploader.upload(req.file.path, { folder: 'lunchImgs' });


        const lunchImage = new LunchImgs({ imageUrl: result2.secure_url });
        

        console.log(lunchImage);
        
        await lunchImage.save();

        
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
            console.log(`File ${req.file.path} deleted successfully.`);
        }

       
        res.status(201).json({
            message: 'Lunch image uploaded successfully',
            lunchImage,
        });

    } 

    catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: 'Failed to upload lunch image' });
    }
};



const fnd = async (req, res) => {
    
    try {
   
        const launchImgs = await LunchImgs.find().lean();

        const products = await Products.find().lean();


        if (launchImgs.length > 0 || products.length > 0) {
            res.render("products", { launchImgs, products });

        }
        
        else {
            res.status(404).json({ message: 'No products found' });
        }


    }
    
    catch (error) {
        console.error("Error while finding products: ", error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};


 module.exports = { allPro, fnd, Launched };
