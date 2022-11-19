const jwt = require("jsonwebtoken")

const authenticated = async (req, res, next) => {
    let token;

    // SEARCH FOR TOKEN FROM REQUEST
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1]; // GET THE TOKEN STRING
    }
    //  CHECK IF TOKEN IS AVAILABLE
    if(!token) return next("An Error Occured");
    try {
        // CHECK IF JWT TOKEN IS VALID 
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        // CHECK IF JWT TOKEN HAS A VALID USER FROM DATABASE
        const user = await User.findById(decoded.id);

        
    if(!user) return next("User Not found"); // ERROR IF INVALID USER

    req.user = user;

    next();
    }catch(err){
        next("An Error occured")
    }
}

module.exports = { authenticated }