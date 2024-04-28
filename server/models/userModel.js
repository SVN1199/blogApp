const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill the name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please fill the email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter Valid Email Address']
    },
    password: {
        type: String,
        minLength: [6, 'Password should be at least 6 characters long'],
        maxLength: [10, 'Password cannot exceed 10 characters'],
        required: [true, 'Please fill in the password'],
        select: false
    },
    tagline: {
        type: String,
        //    minLength: [10, 'Password should be at least 10 characters long'],
        //    maxLength: [50, 'Password cannot exceed 50 characters'],
    },
    aboutme: {
        type: String,
        //    minLength: [50, 'Password should be at least 50 characters long'],
        //    maxLength: [500, 'Password cannot exceed 500 characters'],
    },
    avatar: {
        type: String
    },
    savedBlog: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    contact: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        contactInfo: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        }
    }],
    role: {
        type: String,
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true
    },
    reportsUser: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        reportUserInfo: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        }
    }],
    contactAdmin: [
       {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        contactAdminInfo: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        }
       }
    ],
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

userSchema.methods.isValidPassword = async function (enteredPassword) {
    if (!enteredPassword) {
        throw new Error('Entered password is required');
    }

    if (!this.password) {
        throw new Error('Hashed password is required');
    }
    return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function () {
    const token = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000
    return token
}

let model = mongoose.model('User', userSchema)
module.exports = model