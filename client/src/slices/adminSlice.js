import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
    },
    reducers: {
        getBlogFeatursRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getBlogFeatursSuccess(state, action) {
            return {
                ...state,
                loading: false,
                totalLikes: action.payload.totalLikes,
                totalComments: action.payload.totalComments,
                totalViews: action.payload.totalViews,
                totalUsers: action.payload.users,
                totalBlogs: action.payload.blogLength
            }
        },
        getBlogFeatursFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getAllUsersByAdminRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getAllUsersByAdminSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blogs: [],
                users: action.payload.users

            }
        },
        getAllUsersByAdminFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        isActiveUserPostRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        isActiveUserPostSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isActiveUserUpdated: true
            }
        },
        isActiveUserPostFail(state, action) {
            return {
                ...state,
                loading: false,
                isActiveUserUpdated: false,
                error: action.payload
            }
        },
        isActiveUserPostClear(state, action) {
            return {
                ...state,
                loading: false,
                isActiveUserUpdated: false,
            }
        },
        isActiveUserBlogRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        isActiveUserBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isActiveBlogUpdated: true
            }
        },
        isActiveUserBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                isActiveBlogUpdated: false,
                error: action.payload
            }
        },
        isActiveUserBlogClear(state, action) {
            return {
                ...state,
                loading: false,
                isActiveBlogUpdated: false,
            }
        },
        getUserBlogRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getUserBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blogs: action.payload.blogs
            }
        },
        getUserBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getBlogReportRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getBlogReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reportsBlog: action.payload.blogs
            }
        },
        getBlogReportFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getUserReportRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getUserReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reportsUser: action.payload.users
            }
        },
        getUserReportFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getContactByAdminRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getContactByAdminSuccess(state, action) {
            return {
                ...state,
                loading: false,
                messages: action.payload.contacts
            }
        },
        getContactByAdminFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        deleteBlogReportRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteBlogReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isBlogReportDeleted: true
            }
        },
        deleteBlogReportFail(state, action) {
            return {
                ...state,
                loading: false,
                isBlogReportDeleted: false,
                error: action.payload
            }
        },
        deleteUserReportRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteUserReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserReportDeleted: true
            }
        },
        deleteUserReportFail(state, action) {
            return {
                ...state,
                loading: false,
                isUserReportDeleted: false,
                error: action.payload
            }
        },
        clearBlogReportDeleted(state, action) {
            return {
                ...state,
                isBlogReportDeleted: false
            }
        },
        clearUserReportDeleted(state, action) {
            return {
                ...state,
                isUserReportDeleted: false
            }
        },


        deleteContactRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        deleteContactSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isContactDeleted: true
            }
        },
        deleteContactFail(state, action) {
            return {
                ...state,
                loading: false,
                isContactDeleted: false,
                error: action.payload
            }
        },
        clearContactDeleted(state, action) {
            return {
                ...state,
                isContactDeleted: false
            }
        },
        getAllReportRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getAllReportSuccess(state, action) {
            return {
                ...state,
                loading: false,
                blogReports: action.payload.blogs,
                userReports: action.payload.users
            }
        },
        getAllReportFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getAllBlogByAdminRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getAllBlogByAdminSuccess(state, action) {
            return {
                ...state,
                loading: false,
                allBlogs: action.payload.blogs
            }
        },
        getAllBlogByAdminFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        isActiveToBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        isActiveToBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isActiveToBlogUpdated: true
            }
        },
        isActiveToBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                isActiveToBlogUpdated: false,
                error: action.payload
            }
        },
        isActiveToBlogUpdatedClear(state, action) {
            return {
                ...state,
                isActiveToBlogUpdated: false
            }
        },
        clearAdminError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
})


export const { actions, reducer } = adminSlice

export const {
    getBlogFeatursRequest,
    getBlogFeatursSuccess,
    getBlogFeatursFail,
    getAllUsersByAdminRequest,
    getAllUsersByAdminSuccess,
    getAllUsersByAdminFail,
    isActiveUserPostRequest,
    isActiveUserPostSuccess,
    isActiveUserPostFail,
    isActiveUserBlogRequest,
    isActiveUserBlogSuccess,
    isActiveUserBlogFail,
    getUserBlogRequest,
    getUserBlogSuccess,
    getUserBlogFail,
    isActiveUserPostClear,
    isActiveUserBlogClear,
    getBlogReportRequest,
    getBlogReportSuccess,
    getBlogReportFail,
    getUserReportRequest,
    getUserReportSuccess,
    getUserReportFail,
    getContactByAdminRequest,
    getContactByAdminSuccess,
    getContactByAdminFail,
    deleteBlogReportRequest,
    deleteBlogReportSuccess,
    deleteBlogReportFail,
    deleteUserReportRequest,
    deleteUserReportSuccess,
    deleteUserReportFail,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFail,
    getAllReportRequest,
    getAllReportSuccess,
    getAllReportFail,
    getAllBlogByAdminRequest,
    getAllBlogByAdminSuccess,
    getAllBlogByAdminFail,
    clearContactDeleted,
    isActiveToBlogRequest,
    isActiveToBlogSuccess,
    isActiveToBlogFail,
    clearAdminError,
    clearBlogReportDeleted,
    clearUserReportDeleted,
    isActiveToBlogUpdatedClear
} = actions

export default reducer