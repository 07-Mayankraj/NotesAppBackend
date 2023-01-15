const express = require('express');
const controllers = require('../controllers/users.controller');
const authentication = require('../middlewwares/authentication.middleware');
const userRoute = express.Router()



// signup
userRoute.post('/signup',controllers.addUser)
//login
userRoute.post('/login',controllers.loginFunctionality)


// userRoute.post('/allusers',authentication,(req,res)=>{
//     res.send('so you were logged in ')
// })



module.exports = userRoute;