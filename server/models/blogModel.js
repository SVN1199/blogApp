const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please Enter Blog Category"],
        enum: [
            "Travel",
            "Food",
            "Lifestyle",
            "Fashion",
            "Beauty",
            "Health",
            "Fitness",
            "Parenting",
            "Finance",
            "Technology",
            "DIY & Crafts",
            "Home Decor",
            "Gardening",
            "Education",
            "Photography",
            "Pets",
            "Sports",
            "Entertainment",
            "Politics & Current Events",
            "Art & Design"
        ]
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    thumbnail: {
        type: String,
        required: true
    },
    likeByUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 255
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        }
    }],
    views: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    reportsBlog: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        reportBlogInfo: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: () => Date.now()
        }
    }],
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;