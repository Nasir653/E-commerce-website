const express = require('express');
const app = express();
const xhbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require('path');
const { connDb } = require('./config/connectDb');
const { handleRegister, Login, forgetPassword, resetPassword } = require('./controllers/userContraoller');
const { allPro, fnd, Launched } = require('./controllers/products');
const { eachpro } = require('./controllers/productDetail');
const carts = require('./controllers/cart');
const { isAuthenticated } = require('./middlewear/isAuthicated');
    require('dotenv').config();
const cookieParser = require('cookie-parser');
const multMid = require('./middlewear/multerMid');
const { profilePic, profileDetails } = require('./controllers/profileControllers');



const port = 3001;

connDb();

//MDB Bootstrap


//Engines

app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views", "pages"));

app.engine( "hbs", xhbs.engine({

    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),

  })

);



     // middleWares 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

     //Routes

app.get("/", (req, res) => {

  res.render("index");

})

  app.post("/signup", handleRegister)
  app.get("/signup", (req, res) => {

  res.render("signup");
})


app.get("/login", (req, res) => {

  res.render("login");
})

app.post("/login", Login);

app.get("/user/forgetpassword", (req, res) => {
  
  res.render("forgetPassword");
});


app.post("/user/forgetpassword", forgetPassword);


app.post("/user/resetPassword/:userid", resetPassword);

app.get("/user/resetPassword/:userid", (req, res) => {
  
  const { userid } = req.params;
  res.render("resetPassword", { userid });
  
})



app.get("/createproducts", (req, res) => {

  res.render("Createproducts")

});



app.post("/createproducts", multMid, allPro);
app.post("/launchproducts", multMid , Launched);


app.get("/products", isAuthenticated,  fnd);

app.get("/productDetails/:id", isAuthenticated, eachpro);



app.get("/cart", isAuthenticated, carts );
                     
 


app.get("/profile", isAuthenticated, profileDetails);
 
app.post("/profile", multMid, isAuthenticated,  profilePic );




// My server Port 


 
  app.listen(port, () => {
  console.log(`Server is listening ${port}`)

 });


