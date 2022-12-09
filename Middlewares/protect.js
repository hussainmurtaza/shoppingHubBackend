const jwt = require('jsonwebtoken')
const User = require('../Models/user')

exports.protect = async (req, res, next) => {
    let token
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            throw new Error("Not authorize to this route")
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id)
            next()
        } catch (error) {
            throw new Error("Not authorize user")
        }
    } catch (error) {
        console.log(error)
    }

}