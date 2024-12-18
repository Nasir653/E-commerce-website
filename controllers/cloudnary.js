const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();

cloudinary.config({
    cloud_name:"dhc6axjlg" ,
    api_key:"439222735114564",
    api_secret:"_knbw7gZ8HbKV_kRNUOPa3pfXEQ"
});

module.exports = cloudinary;


  