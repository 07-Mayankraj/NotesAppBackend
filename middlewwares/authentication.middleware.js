const jwt = require('jsonwebtoken')
require('dotenv').config
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const authentication = async(req,res,next)=>{
    try {
        // get token form headers
        const token = req.headers.authorization;

        // this will return userID and decode in  
        const decoded =  jwt.verify( token,JWT_SECRET_KEY);
        if(decoded){
            // we insert userId in payload/req body
            req.body.userID = decoded.userID;
            next()
        }else{
            return res.status(401).json({message:"login first"})
        }
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}

module.exports  = authentication