const catchAsyncError = require("../middleware/catchAsyncError");
const User = require('../models/userModel');
const sendToken = require("../utils/jwt");
const sendEmail = require('../utils/email');
const ErrorHandler = require('../utils/errorHandler');
const Blog = require("../models/blogModel");
const crypto = require('crypto');
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt')


const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return next(new Error('Please provide all required fields: name, email, and password'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new Error('Email already in use'));
    }

    let avatar;

    let BASE_URL = 'http://127.0.0.1:8000'

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        avatar = `${BASE_URL}/uploads/user/${req.file.filename}`
    }

    let user = await User.create({
        name,
        email,
        password,
        avatar
    })

    sendToken(user, 201, res)
})

const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please Enter Email or Password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    if (!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
})

const logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: 'LoggedOut'
        })
}

const changePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    if (!await user.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old password is incorrect', 401))
    }

    user.password = req.body.password
    await user.save()
    res.status(200).json({
        success: true
    })
})

const getUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-contact')

        if (!user) {
            return next(new ErrorHandler('User not authorized', 401))
        }

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        next(error.message)
    }
})

const getAllUsers = catchAsyncError(async (req, res, next) => {
    try {
        let query = { role: { $ne: 'admin' }, isActive: { $ne: false } };

        if (req.query.username) {
            query.name = { $regex: req.query.username, $options: 'i' };
        }

        const users = await User.find(query).select('name avatar').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        next(error)
    }
});


const updateProfile = catchAsyncError(async (req, res, next) => {
    try {
        let newUserData = {
            name: req.body.name,
            email: req.body.email
        }

        let avatar;
        let BASE_URL = 'http://127.0.0.1:8000'

        if (process.env.NODE_ENV === 'production') {
            BASE_URL = `${req.protocol}://${req.get('host')}`
        }

        if (req.file) {
            avatar = `${BASE_URL}/uploads/user/${req.file.filename}`
            newUserData = { ...newUserData, avatar }
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
})

const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    const resetToken = user.getResetToken();
    await user.save({ validateBeforeSave: false });

    let BASE_URL = process.env.FRONTEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get('host')}`;
    }
    const resetUrl = `${BASE_URL}/resetpassword/${resetToken}`;

    const message = `Your password reset url is as follows \n\n 
    ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Spark Password Recovery",
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message), 500);
    }
});


const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = req.params.token;

    let hashedToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    try {
        await user.save({ validateBeforeSave: false });
        sendToken(user, 201, res)
    } catch (error) {
        return next(new ErrorHandler('Could not reset password. Please try again later.', 400));
    }
});


const createAboutSection = catchAsyncError(async (req, res, next) => {

    try {
        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 404))
        }

        let { tagline, aboutme } = req.body

        if (!tagline || !aboutme) {
            return next(new ErrorHandler('Please fill required fields', 400));
        }

        let user = await User.findById(userId);

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        user.tagline = tagline;
        user.aboutme = aboutme;

        let aboutuser = await user.save();

        res.status(200).json({
            success: true,
            aboutuser,
            message: 'About section updated successfully',
        });
    } catch (error) {
        next(error)
    }

})

// about user
const getAboutMe = catchAsyncError(async (req, res, next) => {
    try {

        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const aboutUser = await User.findById(userId)

        if (!aboutUser) {
            return next(new ErrorHandler('User not found', 404))
        }

        const { aboutme, tagline } = aboutUser

        const aboutuser = { aboutme, tagline }

        res.status(200).json({
            success: true,
            aboutuser: aboutuser
        })
    } catch (error) {
        next(error)
    }
})


// count no. of posts by user
const countBlogs = catchAsyncError(async (req, res, next) => {
    try {
        const userId = await User.findById(req.params.id)

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const blogs = await Blog.find({ user: userId })


        let totalViews = 0;
        let totalComments = 0;
        let totalLikes = 0;
        let totalPosts = blogs.length

        blogs.forEach(total => {
            totalViews += total.views
            totalComments += total.comments.length
            totalLikes += total.likeByUser.length
        })

        res.status(200).json({
            success: true,
            totalViews,
            totalLikes,
            totalComments,
            totalPosts
        })
    } catch (error) {
        next(error)
    }
})


//get posts by user
const getPostsByUser = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const user = await User.findById(userId)

        const blog = await Blog.find({ user: user, isActive: true })
            .select('-reportsBlog')
            .populate('user', 'name avatar').sort({ createdAt: -1 })

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        next(error)
    }
})


// getUserByAuthenticationId
const users = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return next(new ErrorHandler('User not authorized', 401))
        }

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})


//getUserByParamsId
const userByParams = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('User not found', 404))
        }

        const user = await User.findById(userId).select('-contact')

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}
)


//getUserPostsBySaved
const getUserPostsBySaved = catchAsyncError(async (req, res, next) => {
    try {

        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('User not found', 404))
        }

        const user = await User.findById(userId)
            .populate({
                path: 'savedBlog',
                match: { isActive: true },
                select: '-reportsBlog',
                populate: {
                    path: 'user',
                    match: { isActive: true },
                    select: 'name avatar isActive'
                }
            });

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        const savedBlog = user.savedBlog;
        res.status(200).json({
            success: true,
            savedBlog
        });
    } catch (error) {
        next(error);
    }
});


const followUser = catchAsyncError(async (req, res, next) => {
    try {
        const userIdToFollow = req.params.id

        if (!mongoose.isValidObjectId(userIdToFollow)) {
            return next(new ErrorHandler('User not found', 404))
        }

        const userId = req.user.id


        if (!userIdToFollow) {
            return next(new ErrorHandler('User not found', 404))
        }

        if (userIdToFollow === userId) {
            return next(new ErrorHandler('You cannot follow your page', 404))
        }

        const userToFollow = await User.findByIdAndUpdate(userIdToFollow,
            { $addToSet: { followers: req.user.id } },
            { new: true }
        )

        await userToFollow.save()

        const currentuser = await User.findByIdAndUpdate(userId,
            { $addToSet: { following: userIdToFollow } }
        )

        await currentuser.save()

        const followers = userToFollow.followers
        const following = userToFollow.following

        res.status(200).json({
            message: 'User followed successfully',
            followers,
            following
        });
    } catch (error) {
        next(error)
    }

})

const unfollowUser = catchAsyncError(async (req, res, next) => {
    try {
        const userIdToFollow = req.params.id;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(userIdToFollow)) {
            return next(new ErrorHandler('User not found', 404));
        }

        if (userIdToFollow === userId) {
            return next(new ErrorHandler('You cannot follow your own page', 400));
        }

        const userToFollow = await User.findByIdAndUpdate(userIdToFollow,
            { $pull: { followers: userId } },
            { new: true }
        );

        await userToFollow.save();

        const currentUser = await User.findByIdAndUpdate(userId,
            { $pull: { following: userIdToFollow } },
            { new: true }
        );

        await currentUser.save();

        const followersCount = userToFollow.followers.length;
        const followingCount = userToFollow.following.length;
        const followers = userToFollow.followers;

        res.status(200).json({
            message: 'User unfollowed successfully',
            followersCount,
            followingCount,
            followers
        });
    } catch (error) {
        next(error)
    }
});

const getFollowersAndFollowing = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const user = await User.findById(req.params.id)
        /*
        .populate({
            path: 'followers',
            select: 'name avatar'
        })
        .populate({
            path: 'following',
            select: 'name avatar'
        });
        */

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        const followers = user.followers;
        const following = user.following;

        res.status(200).json({
            success: true,
            followers,
            following
        });
    } catch (error) {
        next(error);
    }
});



const getUserFollowersAndFollowing = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id

        if (!mongoose.isValidObjectId(userId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const user = await User.findById(userId)
            .populate({
                path: 'followers',
                select: 'name avatar',
                match: { role: { $ne: 'admin' } }
            })
            .populate({
                path: 'following',
                select: 'name avatar',
                match: { role: { $ne: 'admin' } }
            });

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        const followers = user.followers;
        const following = user.following;

        res.status(200).json({
            success: true,
            followers,
            following
        });
    } catch (error) {
        next(error)
    }
});


const userContact = catchAsyncError(async (req, res, next) => {

    try {
        const paramsUserId = req.params.id

        if (!mongoose.isValidObjectId(paramsUserId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const user = await User.findById(paramsUserId);

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        const contactInfo = req.body.contactInfo;
        const userId = req.user.id;

        if (!userId) {
            return next(new ErrorHandler('User not authorized', 401))
        }

        if (userId === req.params.id) {
            return next(new ErrorHandler('Access to your own contact field is not permitted.', 400))
        }

        const existingContact = user.contact.find(contact => contact.userId.toString() === userId);

        if (existingContact) {
            existingContact.contactInfo = contactInfo;
        } else {
            user.contact.push({ userId: userId, contactInfo: contactInfo });
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: 'ContactInfo recieved successfully',
            user: user
        });
    } catch (error) {
        next(error)
    }
});

const getUserContact = catchAsyncError(async (req, res, next) => {
    try {
        let userContacts;

        if (req.params.id === req.user.id) {
            userContacts = await User.findById(req.user.id)
                .select('contact')
                .populate({
                    path: 'contact.userId',
                    select: 'name avatar'
                });
        } else {
            return next(new ErrorHandler('User not authorized to access contacts', 401));
        }

        res.status(200).json({
            success: true,
            contacts: userContacts.contact
        });
    } catch (error) {
        next(error);
    }
});

const deleteContact = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id
    const contactIdToDelete = req.body.contactId;
    if (!contactIdToDelete) {
        return next(new ErrorHandler('Please enter contactId', 400));
    }
    try {
        let user;
        if (userId === req.user.id) {
            user = await User.findById(req.user.id)
            user.contact = user.contact.filter(contact => contact.userId.toString() !== contactIdToDelete)
            user = await user.save()
            res.status(200).json({
                success: true,
                contact: user.contact
            })
        } else {
            return next(new ErrorHandler('User not authorized to delete the contact', 401));
        }
    } catch (error) {
        next(error)
    }
});


const confirmPasswordAccount = catchAsyncError(async(req, res, next) => {
    try {
        const userId = req.user.id
        const userParamsId = req.params.id
        const userEnterPassword = req.body.password

        if (userParamsId !== userId) {
            return next(new ErrorHandler('User is not authorized to delete this account', 401));
        }

        const user = await User.findById(userId).select('password')

        const decryptedPassword = await bcrypt.compare(userEnterPassword, user.password)

        if (!decryptedPassword) {
            return next(new ErrorHandler('User password is incorrect'))
        }

        res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        next(error)
    }
})

const deleteMyAccount = catchAsyncError(async (req, res, next) => {
    try {
        const userParamsId = req.params.id;
        const userId = req.user.id;

        if (userParamsId !== userId) {
            return next(new ErrorHandler('User is not authorized to delete this account', 401));
        }

        await Blog.deleteMany({ user: userId });
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return next(new ErrorHandler('User account not found', 404));
        }

        res.status(200).json({
            success: true,
            message: 'User account deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});




const reportByUserToBlog = catchAsyncError(async (req, res, next) => {
    try {
        const user = req.user.id;
        const reports = req.body.reports;

        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return next(new ErrorHandler('Blog not found', 404));
        }

        if (user === blog.user.toString()) {
            return next(new ErrorHandler('You cannot report your own blog', 400));
        }

        const existingReportIndex = blog.reportsBlog.findIndex(report => report.userId.toString() === user);
        if (existingReportIndex !== -1) {
            blog.reportsBlog[existingReportIndex].reportBlogInfo = reports;
        } else {
            blog.reportsBlog.push({ userId: user, reportBlogInfo: reports });
        }

        await blog.save();

        res.status(200).json({
            success: true,
            reportsBlogByUser: blog.reportsBlog
        });

    } catch (error) {
        next(error);
    }
});


const reportUserByUsers = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reports = req.body.reports;

        const userParamsId = req.params.id

        if (!mongoose.isValidObjectId(userParamsId)) {
            return next(new ErrorHandler('Invalid User', 400))
        }

        const user = await User.findById(userParamsId);

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }

        if (userId === user._id.toString()) {
            return next(new ErrorHandler('You cannot report your own account', 400));
        }

        const existingReportIndex = user.reportsUser.findIndex(report => report.userId.toString() === userId);
        if (existingReportIndex !== -1) {
            user.reportsUser[existingReportIndex].reportUserInfo = reports;
        } else {
            user.reportsUser.push({ userId: userId, reportUserInfo: reports });
        }

        await user.save();

        res.status(200).json({
            success: true,
            reportsUserByUser: user.reportsUser
        });

    } catch (error) {
        next(error);
    }
});


const userContactToAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const contactInfo = req.body.queries;

        const isAdmin = await User.findOne({ role: 'admin' });

        if (!isAdmin) {
            return next(new ErrorHandler('Admin not found', 404));
        }

        const existingContactIndex = isAdmin.contactAdmin.findIndex(contact => contact.userId.toString() === userId);
        if (existingContactIndex !== -1) {
            isAdmin.contactAdmin[existingContactIndex].contactAdminInfo = contactInfo;
        } else {
            isAdmin.contactAdmin.push({ userId: userId, contactAdminInfo: contactInfo });
        }

        await isAdmin.save();

        res.status(200).json({
            success: true,
            message: 'Contact information sent to admin successfully'
        });

    } catch (error) {
        next(error);
    }
});




module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    changePassword,
    resetPassword,
    forgotPassword,
    updateProfile,
    createAboutSection,
    getAboutMe,
    users,
    countBlogs,
    getPostsByUser,
    userByParams,
    getUserPostsBySaved,
    followUser,
    unfollowUser,
    getFollowersAndFollowing,
    getUserFollowersAndFollowing,
    userContact,
    getUserContact,
    deleteContact,
    deleteMyAccount,
    getAllUsers,
    reportByUserToBlog,
    reportUserByUsers,
    userContactToAdmin,
    confirmPasswordAccount
}