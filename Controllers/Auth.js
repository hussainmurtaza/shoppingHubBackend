const User = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        const response = await user.save()
        const token = user.getJwtToken()
        res.status(200).json({response, token})
    } catch (error) {
        console.log(error,"error")
    }
}

exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body
    try {
        if(!email || !password){
            throw new Error('please provide email and password')
        }
        const user = await User.findOne({email}).select('+password')
        if(!user){
            throw new Error('user dont exsist!!!')
        }
        const orgnlPass = await bcrypt.compare(password,user.password)
        if(!orgnlPass){
            throw new Error('invalid credentials!!!')
        }
        const token = user.getJwtToken()
        res.status(200).json({user, token})

    } catch (error) {
        console.log(error,"error")
    }
}