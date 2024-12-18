const { User } = require("../models/userModel");
const cloudinary = require('./cloudnary');
const fs = require('fs');



const profileDetails = async (req, res) => {

    try {

        const id = req.userId;
       
        
        const getProfile = await User.findById(id);
    


        if (getProfile) {

            let getprofileData = getProfile.toObject();

            res.render("profile", { getprofileData});
        }
        
        else {
            res.status(404).send("User not found");
        }
    }
    
    catch (error) {
        console.error("Server error:", error);
        res.status(500).send("An error occurred.");
    }

    
};




const profilePic = async (req, res) => {


    try {

       
        if (!req.file) { 

            return res.status(400).json({ error: 'Profile image is required' });

        }

       
        const result1 = await cloudinary.uploader.upload(req.file.path, { folder: 'ProfilePics' });

      
        const userId = req.userId; 
           
        console.log(userId);
        

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profileImg: result1.secure_url
        });

        
        if (updatedUser) {

            console.log("Profile picture uploaded successfully");
            
            fs.unlinkSync(req.file.path); 

            return res.json({ message: "Profile picture updated successfully!", profileImage: result1.secure_url });

        } else {
            return res.status(404).json({ error: "User not found" });
        }
    }
    
    catch (error) {

        console.error("Error uploading profile picture:", error);
        return res.status(500).json({ error: "An error occurred while uploading the profile picture" });

    }

    

  };


module.exports = { profilePic, profileDetails };


