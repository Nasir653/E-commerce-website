const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporters = require("../utils/nodeMailer");


const handleRegister = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    console.log(req.body)


     
    if (username === "" || email === "" || password === "") {
      return res.render("signup", { errMessage: "All credentials Required" });
    }

    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {

      return res.render("signup", { errMessage: "Email Already Exists!" });

    }

    const HashPassword = await bcrypt.hash(password , 10)

    const newUser = await new User({ username, email, password : HashPassword });

    const updateUserCollection = await newUser.save();

    if (updateUserCollection) {
      
      return res.render("login", {
        successMessage: "User Created Succesfully!",
        
      });
    }
    

  } 

  catch (error) {
    console.error("server Error :" + error);
  }

};



const Login = async (req, res) => {


  try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    console.log(user);
    
 
    if (!user) {
      
      return res.status(404).render("login", { errMessage: " User Not Found" });
       
     }


    const passwordCheck = await bcrypt.compare(password, user.password);
    

    console.log(passwordCheck);


    if (!passwordCheck) {
      console.log("Incorrect Password");
      return res.render("login", { errMessage: "Incorrect Password" , forPass : "Forget Password" });

    }


    else {

      const id = user._id;
      console.log(id);

      const secretKey = "aadinasir";
      const createToken = jwt.sign({ id }, secretKey);

      res.cookie("token", createToken, {

        maxAge: 30 * 24 * 60 * 60 * 1000, // milliseconds /// 30 days
        secure: false,
        httpOnly: true,


      });



      res.redirect(`/products`);



    }

  }

  catch (error) {
    console.error("server Error");
    res.render("login", { errMessage: "An error occurred. Please try again." });
  }

};



const forgetPassword = async (req, res) => {
  
  try{
       
  const { email } = req.body;

  if (email === "") {
    return res.status(404).json({ message: "Enter Your Registered Email" });
  }


    const findUser = await User.findOne( { email } );

  if (!findUser) {
    
    res.status(404).json({ message: "Your email is not registered , Please Signup." });

  }

    const passwordResetLink = `http://localhost:3000/user/resetPassword/${findUser._id}`;
 
      transporters.sendMail(
        {
          from: "malikaadi653@gmail.com",
          to: email,
          // bcc : "services@stylehouse.world",
          subject: "Password reset Link ",
          text: passwordResetLink,
          html: `
       

  <h1>   Hi ${findUser.username} </h1>
<br>
<p>
We received a request to reset your password for your account. Click the link below to set a new
password:
<br>
  ${passwordResetLink}
<br>
If you didn't request this change, please ignore this email. This link will expire in [time limit, e.g., 1 hour].
<br>
If you have any questions, feel free to contact our support team at Malikaadi653@gmail.com. </p>

<br>
<br>
<h3>
Thank you,

</h3>
       
          `
    },
    (reject, resolve) => {
      if (reject) {
        console.log(reject);
        return res.status(500).json({ message: "Server Error" });
      }

      console.log(resolve);

      return res.status(200).json({
        message: "Password Rest link sent to your mail Succesfully",
      });
    }
  );
  }
  
  catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
  }
  
};




  const resetPassword = async (req, res) => {

  
  try {
  
  
    const { userid }  = req.params;
    
    console.log(userid);
    

  const { newPassword, confirmPassword } = req.body;

  const hashPass = await bcrypt.hash(confirmPassword, 10);

    const findUser = await User.findByIdAndUpdate(userid, {
    
    password: hashPass

  })

    
    if (!findUser) {

    res.status(400).json({ message: " Wrong Email" });

    }
    
  
    else {
    res.status(200).json({ message: "Password Change Succesfully" });
    }

  
  }

   catch (error) {
     
    res.status(500).json("Server error")

  }
    


  }








     module.exports = { handleRegister, Login, forgetPassword , resetPassword};