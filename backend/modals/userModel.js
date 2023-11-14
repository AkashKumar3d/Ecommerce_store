const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name can not exceed 30 characters"],
        minLength: [4, "name should be at least 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        //    validate:[validator.email, "please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "password must be at least 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,

        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// hasing the paswords
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12)
})

// jwttoken generate 
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// compare password
userSchema.methods.comparePassword = async function (enterpassword) {
    return await bcrypt.compare(enterpassword, this.password)
}

// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    // generating token 
    const resettoken = crypto.randomBytes(20).toString("hex")

    // hasing and reset password to schemas 
    this.resetPasswordToken = crypto.createHash("sha256").update(resettoken).digest("hex");

    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    return resettoken
}
module.exports = mongoose.model("User", userSchema)