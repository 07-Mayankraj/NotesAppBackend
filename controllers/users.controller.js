const { UserModel } = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config
let JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// !  adding new user

exports.addUser = async (req, res) => {
    const { username, email, role, location, password, DOB } = req.body;

    try {
        // check if user already exites
        const user = await UserModel.find({ email })
        if (user.length > 0) return res.json({ err: "user already exits" })

        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.json({ err: err.message })
            } else {
                const user = new UserModel({ username, email, role, location, password: hash, DOB })
                await user.save();
                console.log(user);
                res.json({ user: "Registered Successsfully" });

            }
        })
    } catch (error) {
        console.log(error);
        res.send('error while saving the user',)
    }
}



exports.loginFunctionality = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })

        if (user.length !== 0) {
            bcrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    token = jwt.sign({ userID: user[0]._id }, JWT_SECRET_KEY, { expiresIn: '24h' })
                    res.send(`message : login success,\n Token : ${token}`)
                } else {
                    res.send('wrong credntials')
                }
            })
        } else {
            res.send('Login failed')
        }
    } catch (error) {
        console.log(error);
        res.send('Login failed',)
    }
}

