const catchAsyncError = require("../middleware/catchAsyncError");
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const Blog = require("../models/blogModel");
const mongoose = require('mongoose')

const getBlogFeatures = catchAsyncError(async (req, res, next) => {
    try {
        const blogs = await Blog.find({})
        const users = await User.find({}).countDocuments()
        const blogLength = await Blog.find({}).countDocuments()


        let totalLikes = 0;
        let totalComments = 0;
        let totalViews = 0;

        blogs.forEach(blog => {
            totalLikes += blog.likeByUser.length
            totalComments += blog.comments.length
            totalViews += blog.views
        })

        res.status(200).json({
            success: true,
            totalLikes,
            totalComments,
            totalViews,
            users,
            blogLength
        })
    } catch (error) {
        next(error)
    }
})

const getAllUsersByAdmin = catchAsyncError(async (req, res, next) => {
    try {

        let query = { role: { $ne: 'admin' } }

        if (req.query.userId) {
            if (!mongoose.isValidObjectId(req.query.userId)) {
                return next(new ErrorHandler('Invalid userId', 400));
            }

            query._id = req.query.userId;
        }

        const users = await User.find(query).select("name avatar user isActive").sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        next(error)
    }
})


const getAllBlogsByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        let query = {};

        if (req.query.blogId) {
            if (!mongoose.isValidObjectId(req.query.blogId)) {
                return next(new ErrorHandler('Invalid blogId', 400))
            }

            query._id = req.query.blogId;

        }

        const blogs = await Blog.find(query).select('title thumbnail category isActive');

        res.status(200).json({
            success: true,
            blogs
        });
    } catch (error) {
        next(error);
    }
});


const isActiveToBlog = catchAsyncError(async (req, res, next) => {
    try {
        const blogId = req.body.blogId;
        const active = req.body.active;

        const blog = await Blog.findById(blogId);

        if (active === 'terminate') {
            await Blog.findByIdAndDelete(blogId);
        } else {
            if (active === 'active') {
                blog.isActive = true;
            } else if (active === 'deactive') {
                blog.isActive = false;
            } else {
                return res.status(400).json({ success: false, message: 'Invalid active value' });
            }
            await blog.save();
        }

        res.status(200).json({ success: true, message: 'Blog status updated successfully' });
    } catch (error) {
        // Handle error
        next(error);
    }
});

const isActiveUserByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const activeStatus = req.body.active;

        if (activeStatus !== 'active' && activeStatus !== 'deactive' && activeStatus !== 'terminate') {
            return next(new ErrorHandler('Invalid active status', 400));
        }

        let updatedUser;

        if (activeStatus === 'terminate') {
            await User.findByIdAndDelete(userId);
            res.status(200).json({ success: true, message: 'User terminated successfully' });
        } else {
            const isActive = activeStatus === 'active';
            updatedUser = await User.findByIdAndUpdate(userId, { isActive }, { new: true });

            if (!updatedUser) {
                return next(new ErrorHandler('User not found', 404));
            }

            res.status(200).json({ success: true, user: updatedUser });
        }
    } catch (error) {
        next(error);
    }
});


const isActiveBlogByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const blogId = req.body.blogId;
        const activeStatus = req.body.active;

        if (activeStatus !== 'active' && activeStatus !== 'deactive' && activeStatus !== 'terminate') {
            return next(new ErrorHandler('Invalid active status', 400));
        }

        let updatedBlog;

        if (activeStatus === 'terminate') {
            await Blog.findByIdAndDelete(blogId);
            return res.status(200).json({ success: true, message: 'Blog terminated successfully' });
        }

        let isActive;

        if (activeStatus === 'active') {
            isActive = true;
        } else if (activeStatus === 'deactive') {
            isActive = false;
        }

        updatedBlog = await Blog.findByIdAndUpdate(blogId, { isActive }, { new: true });

        if (!updatedBlog) {
            return next(new ErrorHandler('Blog not found', 404));
        }

        res.status(200).json({
            success: true,
            blog: updatedBlog
        });
    } catch (error) {
        next(error);
    }
});


const getUserBlogsByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id
        const blogs = await Blog.find({ user: userId }).select('title user thumbnail isActive').populate('user', 'name').sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            blogs
        })
    } catch (error) {
        next(error)
    }
})

const getUserContactByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const isAdmin = await User.findOne({ role: 'admin' })
            .populate({
                path: "contactAdmin",
                populate: {
                    path: 'userId',
                    select: 'name avatar'
                }
            })

        if (!isAdmin) {
            return next(new ErrorHandler('Admin not found', 404));
        }

        let contacts = isAdmin.contactAdmin

        contacts = contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({
            success: true,
            contacts
        })

    } catch (error) {
        next(error)
    }
})

const deleteUserContactByaAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const messageId = req.body.messageId
        const adminUser = await User.findOne({ role: 'admin' });

        if (!adminUser) {
            return next(new ErrorHandler('Admin user not found', 404));
        }

        adminUser.contactAdmin.pull(messageId)
        adminUser.save()

        res.status(200).json({
            success: true,
            message: 'Message deleted successfully from admin contact list'
        });
    } catch (error) {
        next(error)
    }
})

const getBlogReportsByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const blogId = req.params.id
        const blogs = await Blog.findById(blogId).select("reportsBlog")

        res.status(200).json({
            success: true,
            blogs: blogs
        })

    } catch (error) {
        next(error)
    }
})

const getUserReportsByAdmin = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.params.id
        const users = await User.findById(userId).select("reportsUser")

        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        next(error)
    }
})

const blogReportDelete = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id;
    const reportId = req.body.reportId;

    try {

        if (!reportId) {
            return next(new ErrorHandler('Report ID not provided', 400));
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { reportsBlog: { _id: reportId } }
        }, { new: true });

        if (!updatedBlog) {
            return next(new ErrorHandler('Report not found', 404));
        }

        res.status(200).json({
            success: true,
            blogs: updatedBlog.reportsBlog
        })

    } catch (error) {
        next(error)
    }
})

const userReportDelete = catchAsyncError(async (req, res, next) => {
    const userId = req.params.id;
    const reportId = req.body.reportId;

    try {

        if (!reportId) {
            return next(new ErrorHandler('Report ID not provided', 400));
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: { reportsUser: { _id: reportId } }
        }, { new: true });

        if (!updatedUser) {
            return next(new ErrorHandler('Report not found', 404));
        }

        res.status(200).json({
            success: true,
            users: updatedUser.reportsUser
        })

    } catch (error) {
        next(error)
    }
})

const getAllReports = catchAsyncError(async (req, res, next) => {
    try {
        const blogs = await Blog.find({ reportsBlog: { $exists: true, $ne: [] } })
            .select(' _id title category thumbnail user')

        const users = await User.find({ reportsUser: { $exists: true, $ne: [] } })
            .select('name avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            blogs,
            users
        });
    } catch (error) {
        next(error);
    }
});


module.exports = {
    getBlogFeatures,
    getAllUsersByAdmin,
    isActiveUserByAdmin,
    getUserBlogsByAdmin,
    isActiveBlogByAdmin,
    getUserContactByAdmin,
    deleteUserContactByaAdmin,
    getBlogReportsByAdmin,
    getUserReportsByAdmin,
    blogReportDelete,
    userReportDelete,
    getAllReports,
    getAllBlogsByAdmin,
    isActiveToBlog
}