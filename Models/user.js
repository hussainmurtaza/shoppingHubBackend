const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIREY})
}

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 8)
    next()
})

module.exports = mongoose.model('user', userSchema)