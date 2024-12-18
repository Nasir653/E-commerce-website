const mongoose = require("mongoose");

const connDb = async () => {
    try {
        const URL = "mongodb://127.0.0.1:27017/myDatabase";
        await mongoose.connect(URL)
            
        console.log("Database Connected");
    }
    
    catch (error) {
        console.error("DataBase Error:", error.message); // Log the error message
    }
};

module.exports = { connDb };

