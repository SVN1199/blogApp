const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login First to handle this resource', 401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} not allowed`, 401));
        }
        next();
    };
};
module.exports = {
    isAuthenticateUser,
    authorizeRoles
}