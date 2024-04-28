import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        user: {},
        singleUser: {},
        userposts: [],
        aboutUser: {},
        saved: [],
        savedBlog: [],
        getFollowers: [],
        getFollowing: [],
        isAboutcreated: false
    },
    reducers: {
        getUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload,
                saved: action.payload.savedBlog,
            }
        },
        getUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getSingleUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getSingleUserSuccess(state, action) {
            return {
                ...state,
                singleUser: action.payload.user
            }
        },
        getSingleUserFail(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        getUserPostsRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getUserPostsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userposts: action.payload.blog
            }
        },
        getUserPostsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        saveBlogRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        saveBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                saved: action.payload.savedBlog
            }
        },
        saveBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        unsaveBlogRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        unsaveBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                saved: action.payload.savedBlog
            }
        },
        unsaveBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        countBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        countBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                totalViews: action.payload.totalViews,
                totalLikes: action.payload.totalLikes,
                totalComments: action.payload.totalComments,
                totalPosts: action.payload.totalPosts
            }
        },
        countBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getsaveBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getsaveBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                savedBlog: action.payload.savedBlog
            }
        },
        getsaveBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createaboutRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        createaboutSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAboutcreated: true
            }
        },
        createaboutFail(state, action) {
            return {
                ...state,
                loading: false,
                isAboutcreated: false,
                error: action.payload
            }
        },
        clearAboutCreated(state, action) {
            return {
                ...state,
                isAboutcreated: false,
            }
        },
        getaboutRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getaboutSuccess(state, action) {
            return {
                ...state,
                loading: false,
                aboutUser: action.payload.aboutuser
            }
        },
        getaboutFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getFollowRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getFollowSuccess(state, action) {
            return {
                ...state,
                loading: false,
                followers: action.payload.followers,
                following: action.payload.following,
            }
        },
        getFollowFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        followUserRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        followUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                followers: action.payload.followers,
                following: action.payload.following,
            }
        },
        followUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        unfollowUserRequest(state, action) {
            return {
                ...state,
                loading: false
            }
        },
        unfollowUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                followers: action.payload.followers,
                isunFollowed: true
            }
        },
        unfollowUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        getFollowersRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        getFollowersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                getFollowers: action.payload.followers,
                getFollowing: action.payload.following,
            }
        },
        getFollowersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        contactCreateRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        contactCreateSuccess(state, action) {
            return {
                ...state,
                loading: false,
                contact: action.payload.user,
                isCreatedContact: true
            }
        },
        contactCreateFail(state, action) {
            return {
                ...state,
                isCreatedContact: false,
                error: action.payload
            }
        },
        contactGetRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        contactGetSuccess(state, action) {
            return {
                ...state,
                loading: false,
                contact: action.payload.contacts
            }
        },
        contactGetFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        contactDeleteRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        contactDeleteSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isDeleteContact: true
            }
        },
        contactDeleteFail(state, action) {
            return {
                ...state,
                loading: false,
                isDeleteContact: false,
                error: action.payload
            }
        },
        clearContactCreate(state, action) {
            return {
                ...state,
                isCreatedContact: false,
            }
        },
        clearContactDelete(state, action) {
            return {
                ...state,
                isDeleteContact: false,
            }
        },
        deleteAccountRequest(state, action) {
            return {
                ...state,
                loading: false,
            }
        },
        deleteAccountSuccess(state, action) {
            return {
                ...state,
                loading: false,
                singleUser: {},
                user: {},
                isDeleteAccount: true
            }
        },
        deleteAccountFail(state, action) {
            return {
                ...state,
                loading: false,
                isDeleteContact: false,
                error: action.payload
            }
        },
        deleteAccountConfirmRequest(state, action) {
            return {
                ...state,
                loading: false,
            }
        },
        deleteAccountConfirmSuccess(state, action) {
            return {
                ...state,
                loading: false,
                confirmation: true
            }
        },
        deleteAccountConfirmFail(state, action) {
            return {
                ...state,
                loading: false,
                confirmation: false,
                error: action.payload
            }
        },
        clearDeleteAccountConfirmFail(state, action) {
            return {
                ...state,
                confirmation: false,
            }
        },
        clearAccountDeleted(state, action) {
            return {
                ...state,
                user: {},
                singleUser: {},
                isDeleteContact: false,
            }
        },
        postReportToUserRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        postReportToUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: true
            }
        },
        postReportToUserFail(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: false,
                error: action.payload
            }
        },
        clearPostReportToUser(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: false,
            }
        },
        postReportToBlogRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        postReportToBlogSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: true
            }
        },
        postReportToBlogFail(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: false,
                error: action.payload
            }
        },
        contactUserToAdminRequest(state, action) {
            return {
                ...state,
                loading: true
            }
        },
        contactUserToAdminSuccess(state, action) {
            return {
                ...state,
                loading: true,
                isContactedAdmin: true
            }
        },
        contactUserToAdminFail(state, action) {
            return {
                ...state,
                loading: false,
                isContactedAdmin: false,
                error: action.payload
            }
        },
        contactUserToAdminClear(state, action) {
            return {
                ...state,
                isContactedAdmin: false,
            }
        },
        getAllUsersRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        getAllUsersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                allUsers: action.payload.users
            }
        },
        getAllUsersFail(state, action) {
            return {
                ...state,
                error: action.payload
            }
        },
        clearPostReportToBlog(state, action) {
            return {
                ...state,
                loading: false,
                isReportSuccess: false,
            }
        },
        clearUsersError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
})

export const { actions, reducer } = usersSlice

export const {
    getUserRequest,
    getUserSuccess,
    getUserFail,
    saveBlogRequest,
    saveBlogSuccess,
    saveBlogFail,
    unsaveBlogRequest,
    unsaveBlogSuccess,
    unsaveBlogFail,
    countBlogRequest,
    countBlogSuccess,
    countBlogFail,
    getSingleUserRequest,
    getSingleUserSuccess,
    getSingleUserFail,
    getUserPostsRequest,
    getUserPostsSuccess,
    getUserPostsFail,
    getsaveBlogRequest,
    getsaveBlogSuccess,
    getsaveBlogFail,
    createaboutRequest,
    createaboutSuccess,
    createaboutFail,
    getaboutRequest,
    getaboutSuccess,
    getaboutFail,
    getFollowRequest,
    getFollowSuccess,
    getFollowFail,
    followUserRequest,
    followUserSuccess,
    followUserFail,
    unfollowUserRequest,
    unfollowUserSuccess,
    unfollowUserFail,
    clearUsersError,
    getFollowersRequest,
    getFollowersSuccess,
    getFollowersFail,
    contactCreateRequest,
    contactCreateSuccess,
    contactCreateFail,
    contactGetRequest,
    contactGetSuccess,
    contactGetFail,
    contactDeleteRequest,
    contactDeleteSuccess,
    contactDeleteFail,
    clearContactDelete,
    clearAboutCreated,
    deleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFail,
    clearContactCreate,
    clearAccountDeleted,
    postReportToUserRequest,
    postReportToUserSuccess,
    postReportToUserFail,
    postReportToBlogRequest,
    postReportToBlogSuccess,
    postReportToBlogFail,
    clearPostReportToBlog,
    clearPostReportToUser,
    contactUserToAdminRequest,
    contactUserToAdminSuccess,
    contactUserToAdminFail,
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFail,
    contactUserToAdminClear,
    deleteAccountConfirmRequest,
    deleteAccountConfirmSuccess,
    deleteAccountConfirmFail,
    clearDeleteAccountConfirmFail,
} = actions

export default reducer