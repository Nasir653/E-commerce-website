
const jwt = require("jsonwebtoken");



const isAuthenticated = async (req, res, next) => {
    
    try {

        
        const { token } = req.cookies;
        const secretKey = "aadinasir";
        console.log(token);
        

        if (!token) {
                
            return res
                .status(403)
                .render("login", { errMessage: "Bad Auth! Forbidden " });
        }
        
        else {
        

            jwt.verify(token, secretKey, (reject, resolve) => {
                if (reject) {
                    return res
                        .status(401)
                        .render("login", { errMessage: "Unauthorized to access" });
                }

                // console.log(resolve);

                req.userId = resolve.id;

                next();

            });
            
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { isAuthenticated };

