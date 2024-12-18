const nodemailer = require('nodemailer');


const transporters= nodemailer.createTransport({
    service: 'gmail',
    auth: {

        user: 'malikaadi653@gmail.com', 
        pass: 'tvvm cbui egih puts'  
        
    }

});

module.exports = transporters;