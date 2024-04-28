const mongoose = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");

const createBlog = catchAsyncError(async (req, res, next) => {
    const { title, description, category } = req.body

    let blogImage;

    let BASE_URL = 'http://127.0.0.1:8000'

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        blogImage = `${BASE_URL}/uploads/blogs/${req.file.filename}`
    }


    const blogger = await Blog.create({
        title,
        description,
        category,
        thumbnail: blogImage,
        user: req.user.id
    });

    res.status(201).json({
        success: true,
        blogger,
        message: 'Blog created successfully'
    });

})

const getAllBlog = catchAsyncError(async (req, res, next) => {

    const activeUsers = await User.find({ isActive: true }).select('_id')

    const blogs = await Blog.find({ user: { $in: activeUsers }, isActive: true }).populate('user', 'name avatar isActive').sort({ createdAt: -1 })

    res.status(200).json({
        success: true,
        blogs
    })
})

const getBlogBySearch = catchAsyncError(async (req, res, next) => {
    try {
        let query = { isActive: true };

        if (req.query.search) {
            query.$and = [
                { isActive: true },
                {
                    $or: [
                        { title: { $regex: req.query.search, $options: 'i' } },
                        { description: { $regex: req.query.search, $options: 'i' } },
                        { category: { $regex: req.query.search, $options: 'i' } },
                    ]
                }
            ];
        }

        const blogs = await Blog.find(query)
            .select('-reportsBlog')
            .populate('user', 'name avatar')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            blogs
        });

    } catch (error) {
        next(error);
    }
});


const getBlogByFollowing = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        const followingIds = user.following.map(userId => new mongoose.Types.ObjectId(userId));

        const blogs = await Blog.find({ user: { $in: followingIds }, isActive: true })
            .select('-reportsBlog')
            .populate('user');

        res.status(200).json({
            success: true,
            blogs
        });
    } catch (error) {
        next(error)
    }
})

const getSingleBlog = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id

    if (!mongoose.isValidObjectId(blogId)) {
        return next(new ErrorHandler('Invalid Blog Id', 400));
    }

    const blog = await Blog.findById(blogId)
        .select('-reportsBlog')
        .populate('user', 'name avatar');

    blog.views += 1;
    await blog.save();

    res.status(200).json({
        success: true,
        blog,
    });
})

const updateBlog = catchAsyncError(async (req, res, next) => {

    let newBlogData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
    }

    let blogId = req.params.id

    if (!mongoose.isValidObjectId(blogId)) {
        return next(new ErrorHandler('Invalid Blog Id', 400));
    }

    let blog = await Blog.findById(blogId)

    if (!blog) {
        return next(new ErrorHandler('No Blog Found', 400))
    }

    if (!req.user) {
        return next(new ErrorHandler('User Not Found', 404))
    }

    if (blog.user.toString() !== req.user.id) {
        return next(new ErrorHandler('User Not Authorized', 401))
    }

    let blogImage;

    let BASE_URL = 'http://127.0.0.1:8000'

    if (process.env.NODE_ENV === 'production') {
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if (req.file) {
        blogImage = `${BASE_URL}/uploads/blogs/${req.file.filename}`
        newBlogData.thumbnail = blogImage;
    }


    blog = await Blog.findByIdAndUpdate(
        req.params.id,
        newBlogData,
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({
        success: true,
        blog,
    });

}
);

const deleteBlog = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id

    if (!mongoose.isValidObjectId(blogId)) {
        return next(new ErrorHandler('Invalid Blog Id', 400));
    }

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
        return next(new ErrorHandler('Blog not found', 404));
    }

    if (!req.user) {
        return next(new ErrorHandler('User Not Found', 404))
    }

    if (blog.user.toString() !== req.user.id) {
        return next(new ErrorHandler('User Not Authorized', 401))
    }

    res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
    });
});

const postComments = catchAsyncError(async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(blogId)) {
            return next(new ErrorHandler('Invalid Blog Id', 400));
        }

        const user = await User.findById(userId);

        if (!user.isActive) {
            return next(new ErrorHandler('You are suspended by admin', 403));
        }

        if (!userId) {
            return next(new ErrorHandler('User not authorized', 401));
        }

        const userActive = await User.find({ isActive: true, _id: userId })

        let blog = await Blog.findById(blogId)

        if (!blog) {
            return next(new ErrorHandler('Blog not found', 404));
        }

        const { content } = req.body;

        const userCommentIndex = blog.comments.findIndex(comment => comment.user.toString() === userId);

        if (userCommentIndex !== -1) {
            blog.comments[userCommentIndex].content = content;
        } else {
            blog.comments.push({ user: userId, content });
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: "Comment has been successfully submitted.",
            blog
        });
    } catch (error) {
        return next(error);
    }
});


const getAllComments = catchAsyncError(async (req, res, next) => {

    const blogId = req.params.id

    if (!mongoose.isValidObjectId(blogId)) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    const comment = await Blog.findById(blogId).populate('comments.user', 'name avatar')

    res.status(200).json({
        success: true,
        reviews: comment.comments
    })
})

const deleteComments = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id;
    const userId = req.user.id;
    const commentUser = req.body.commentUser;

    try {
        if (!mongoose.isValidObjectId(blogId)) {
            return next(new ErrorHandler('Invalid Blog Id', 400));
        }

        const blog = await Blog.findById(blogId);

        const isUserExists = blog.comments.some(comment => comment.user.toString() === userId);
        const isUserBlog = blog.user.toString() === userId;

        if (isUserExists) {
            blog.comments = blog.comments.filter(comment => comment.user.toString() !== userId);
        } else if (isUserBlog) {
            blog.comments = blog.comments.filter(comment => comment.user.toString() !== commentUser);
        } else {
            return next(new ErrorHandler('User not authorized to delete this comment', 403));
        }

        await blog.save();

        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        next(error);
    }
});


const addLike = catchAsyncError(async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likeByUser: req.user.id } },
            { new: true }
        );

        if (!updatedBlog) {
            return next(new ErrorHandler('Blog not found', 404))
        }

        res.status(200).json({
            usersLikes: updatedBlog.likeByUser
        });
    } catch (error) {
        next(error);
    }
});

const unLike = catchAsyncError(async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $pull: { likeByUser: req.user.id } },
            { new: true }
        );

        if (!updatedBlog) {
            return next(new ErrorHandler('Blog not found', 404))
        }

        res.status(200).json({
            usersLikes: updatedBlog.likeByUser
        });
    } catch (error) {
        next(error);
    }
});


const saveBlog = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id;

    if (!blogId) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    if (!req.user || !req.user.id) {
        return next(new ErrorHandler('Unauthorized access', 401))
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        const isAlreadySaved = user.savedBlog.includes(blogId);
        if (isAlreadySaved) {
            return next(new ErrorHandler('Blog already saved', 400))
        }

        user.savedBlog.push(blogId);
        await user.save();

        res.status(200).json({
            success: true,
            savedBlog: user.savedBlog,
        });


    } catch (error) {
        next(error)
    }
});

const unsaveBlog = catchAsyncError(async (req, res, next) => {
    const blogId = req.params.id;

    if (!blogId) {
        return next(new ErrorHandler('Blog not found', 404))
    }

    if (!req.user || !req.user.id) {
        return next(new ErrorHandler('Unauthorized access', 401))
    }

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }

        user.savedBlog.pull(blogId);
        await user.save();

        res.status(200).json({
            success: true,
            savedBlog: user.savedBlog,
        });

    } catch (error) {
        next(error)
    }
});


const trendingBlog = catchAsyncError(async (req, res, next) => {
    try {
        const blogs = await Blog.aggregate([
            {
                $match: { isActive: true }
            },
            {
                $addFields: {
                    totalLikes: { $size: '$likeByUser' },
                    totalComments: { $size: '$comments' },
                    totalViews: "$views"
                }
            },
            {
                $sort: {
                    totalViews: -1,
                    totalComments: -1,
                    totalLikes: -1
                }
            },
            {
                $limit: 12
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    category: 1,
                    title: 1,
                    views: 1,
                    description: 1,
                    thumbnail: 1,
                    totalLikes: 1,
                    totalComments: 1,
                    totalViews: 1,
                    createdAt: 1,
                    'user.name': 1,
                    'user.avatar': 1,
                    'user._id': 1,
                }
            }
        ]);

        res.status(200).json({
            success: true,
            blogs
        });
    } catch (error) {
        next(error);
    }
});



module.exports = {
    createBlog,
    getAllBlog,
    getBlogBySearch,
    getBlogByFollowing,
    getSingleBlog,
    updateBlog,
    deleteBlog,
    postComments,
    getAllComments,
    deleteComments,
    addLike,
    unLike,
    saveBlog,
    unsaveBlog,
    trendingBlog
}