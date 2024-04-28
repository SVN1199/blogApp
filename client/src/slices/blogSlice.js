import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        loading: false,
        blogs: [],
        blog: {},
        searchBlogs: [],
        followingBlogs: [],
        trending: [],
        likes: [],
        reviews: [],
        saved: [],
        isBlogCreated: false,
        isBlogUpdated: false,
        isBlogDeleted: false,
        isReviewCreated: false,
        isReviewDeleted: false,
        error: null
    },
    reducers: {
        blogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        blogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blogs: [],
                blog: action.payload.blog,
                likes: action.payload.blog.likeByUser,
            }
        },
        blogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        allBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        allBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blogs: action.payload.blogs,
                blog: {},
                trending: [],
                followingBlogs: [],
            }
        },
        allBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        getTrendingBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getTrendingBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                trending: action.payload.blogs,
                blog: {},
                blogs: [],
                followingBlogs: []
            }
        },
        getTrendingBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getFollowingBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getFollowingBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                followingBlogs: action.payload.blogs,
                trending: [],
                blog: {},
                blogs: []
            }
        },
        getFollowingBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getSearchBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getSearchBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                searchBlogs: action.payload.blogs
            }
        },
        getSearchBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                searchBlogs: [],
                error: action.payload
            }
        },
        newBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        newBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                isBlogCreated: true
            }
        },
        newBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isBlogCreated: false
            }
        },
        clearBlogCreated(state, action) {
            return {
                ...state,
                isBlogCreated: false
            }
        },
        clearBlogError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        deleteBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isBlogDeleted: true
            }
        },
        deleteBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearBlogDeleted(state, action) {
            return {
                ...state,
                isBlogDeleted: false
            }
        },
        updateBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        updateBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blog: action.payload.blog,
                isBlogUpdated: true
            }
        },
        updateBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearBlogUpdate(state, action) {
            return {
                ...state,
                isBlogUpdated: false
            }
        },
        reviewCreateRequest(state, action) {
            return {
                ...state,
                commentsLoading: true
            }
        },
        reviewCreateSuccess(state, action) {
            return {
                ...state,
                commentsLoading: false,
                reviews: action.payload.blog,
                isReviewCreated: true
            }
        },
        reviewCreateFail(state, action) {
            return {
                ...state,
                commentsLoading: false,
                error: action.payload,
            }
        },
        reviewDeleteRequest(state, action) {
            return {
                ...state,
                commentsLoading: true
            }
        },
        reviewDeleteSuccess(state, action) {
            return {
                ...state,
                commentsLoading: false,
                isReviewDeleted: true
            }
        },
        reviewDeleteFail(state, action) {
            return {
                ...state,
                commentsLoading: false,
                error: action.payload,
            }
        },
        clearReviewCreated(state, action) {
            return {
                ...state,
                commentsLoading: false,
                isReviewCreated: false
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                commentsLoading: false,
                isReviewDeleted: false
            }
        },
        reviewGetRequest(state, action) {
            return {
                ...state,
                commentsLoading: true
            }
        },
        reviewGetSuccess(state, action) {
            return {
                ...state,
                commentsLoading: false,
                reviews: action.payload.reviews,
            }
        },
        reviewGetFail(state, action) {
            return {
                ...state,
                commentsLoading: false,
                error: action.payload,
            }
        },
        addLikeRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        addLikeSuccess(state, action) {
            return {
                ...state,
                loading: false,
                likes: action.payload.usersLikes
            }
        },
        addLikeFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        unLikeRequest(state, action) {
            return {
                ...state,
                loading : false
            }
        },
        unLikeSuccess(state, action) {
            return {
                ...state,
                loading: false,
                likes: action.payload.usersLikes
            }
        },
        unLikeFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearAllError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
})

export const { actions, reducer } = blogSlice

export const {
    blogRequest,
    blogSuccess,
    blogFail,
    allBlogRequest,
    allBlogSuccess,
    allBlogFail,
    getTrendingBlogRequest,
    getTrendingBlogSuccess,
    getTrendingBlogFail,
    getFollowingBlogRequest,
    getFollowingBlogSuccess,
    getFollowingBlogFail,
    getSearchBlogRequest,
    getSearchBlogSuccess,
    getSearchBlogFail,
    newBlogRequest,
    newBlogSuccess,
    newBlogFail,
    clearBlogCreated,
    clearBlogError,
    updateBlogRequest,
    updateBlogSuccess,
    updateBlogFail,
    clearBlogUpdate,
    deleteBlogRequest,
    deleteBlogSuccess,
    deleteBlogFail,
    clearBlogDeleted,
    reviewCreateRequest,
    reviewCreateSuccess,
    reviewCreateFail,
    reviewDeleteRequest,
    reviewDeleteSuccess,
    reviewDeleteFail,
    clearReviewCreated,
    clearReviewDeleted,
    reviewGetRequest,
    reviewGetSuccess,
    reviewGetFail,
    addLikeRequest,
    addLikeSuccess,
    addLikeFail,
    unLikeRequest,
    unLikeSuccess,
    unLikeFail,
    clearAllError
} = actions

export default reducer