const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    })
}

const register =  asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    // Encrypt the password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userCreated = User.create({
        username: username,
        password: hashedPassword,
    })

    if(userCreated){
        res.status(201).json({
            _id: userCreated.id,
            username: userCreated.username,
            token: generateToken(userCreated._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username: username})
    if(user && (await bcrypt.compare(password, user.password))){
        req.session.clientId = 'abc12345';
        req.session.myNum = 5;
        res.status(201).json({message: "user loggged in"})
    } else {
        res.status(400).send({
            message: "Invalid credentials"
        })
    }
})

module.exports = {
    login,
    register
}