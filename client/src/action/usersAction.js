import axios from "axios"
import { contactCreateFail, contactCreateRequest, contactCreateSuccess, contactDeleteFail, contactDeleteRequest, contactDeleteSuccess, contactGetFail, contactGetRequest, contactGetSuccess, contactUserToAdminFail, contactUserToAdminRequest, contactUserToAdminSuccess, countBlogFail, countBlogRequest, countBlogSuccess, createaboutFail, createaboutRequest, createaboutSuccess, deleteAccountConfirmFail, deleteAccountConfirmRequest, deleteAccountConfirmSuccess, deleteAccountFail, deleteAccountRequest, deleteAccountSuccess, followUserFail, followUserRequest, followUserSuccess, getAllUsersFail, getAllUsersRequest, getAllUsersSuccess, getFollowFail, getFollowRequest, getFollowSuccess, getFollowersFail, getFollowersRequest, getFollowersSuccess, getSingleUserFail, getSingleUserRequest, getSingleUserSuccess, getUserFail, getUserPostsFail, getUserPostsRequest, getUserPostsSuccess, getUserRequest, getUserSuccess, getaboutFail, getaboutRequest, getaboutSuccess, getsaveBlogFail, getsaveBlogRequest, getsaveBlogSuccess, postReportToBlogFail, postReportToBlogRequest, postReportToBlogSuccess, postReportToUserFail, postReportToUserRequest, postReportToUserSuccess, saveBlogFail, saveBlogRequest, saveBlogSuccess, unfollowUserFail, unfollowUserRequest, unfollowUserSuccess, unsaveBlogFail, unsaveBlogRequest, unsaveBlogSuccess } from "../slices/usersSlice"

export const usersGet = () => async (dispatch) => {
    try {
        dispatch(getUserRequest())
        const { data } = await axios.get('/api/v1/user/users')
        dispatch(getUserSuccess(data))
    } catch (error) {
        dispatch(getUserFail(error.response.data.message))
    }
}


export const saveBlog = id => async (dispatch) => {
    try {
        dispatch(saveBlogRequest())
        const { data } = await axios.put(`/api/v1/blog/saveblog/${id}`)
        dispatch(saveBlogSuccess(data))
    } catch (error) {
        dispatch(saveBlogFail(error.response.data.message))
    }
}

export const unsaveBlog = id => async (dispatch) => {
    try {
        dispatch(unsaveBlogRequest())
        const { data } = await axios.put(`/api/v1/blog/unsaveblog/${id}`)
        dispatch(unsaveBlogSuccess(data))
    } catch (error) {
        dispatch(unsaveBlogFail(error.response.data.message))
    }
}

export const userByParams = (userId) => async (dispatch) => {
    try {
        dispatch(getSingleUserRequest())
        const { data } = await axios.get(`/api/v1/user/getuserbyparams/${userId}`)
        dispatch(getSingleUserSuccess(data))
    } catch (error) {
        dispatch(getSingleUserFail(error.response.data.message))
    }
}

export const countPost = (userId) => async (dispatch) => {
    try {
        dispatch(countBlogRequest())
        const { data } = await axios.get(`/api/v1/user/count/${userId}`)
        dispatch(countBlogSuccess(data))
    } catch (error) {
        dispatch(countBlogFail(error.response.data.message))
    }
}

export const getPostByUser = (userId) => async (dispatch) => {
    try {
        dispatch(getUserPostsRequest())
        const { data } = await axios.get(`/api/v1/user/getposts/${userId}`)
        dispatch(getUserPostsSuccess(data))
    } catch (error) {
        dispatch(getUserPostsFail(error.response.data.message))
    }
}

export const getSaveBlogByUser = (userId) => async (dispatch) => {
    try {
        dispatch(getsaveBlogRequest())
        const { data } = await axios.get(`/api/v1/user/getuserpostsbysaved/${userId}`)
        dispatch(getsaveBlogSuccess(data))
    } catch (error) {
        dispatch(getsaveBlogFail(error.response.data.message))
    }
}

export const createAbout = (userId, formData) => async (dispatch) => {
    try {
        dispatch(createaboutRequest())
        const { data } = await axios.put(`/api/v1/user/about/${userId}`, formData)
        dispatch(createaboutSuccess(data))
    } catch (error) {
        dispatch(createaboutFail(error.response.data.message))
    }
}

export const getAbout = (userId) => async (dispatch) => {
    try {
        dispatch(getaboutRequest())
        const { data } = await axios.get(`/api/v1/user/about/${userId}`)
        dispatch(getaboutSuccess(data))
    } catch (error) {
        dispatch(getaboutFail(error.response.data.message))
    }
}


export const followUser = (userId) => async (dispatch) => {
    try {
        dispatch(followUserRequest())
        const { data } = await axios.put(`/api/v1/user/follow/${userId}`)
        dispatch(followUserSuccess(data))
    } catch (error) {
        dispatch(followUserFail(error.response.data.message))
    }
}

export const unfollowUser = (userId) => async (dispatch) => {
    try {
        dispatch(unfollowUserRequest())
        const { data } = await axios.put(`/api/v1/user/unfollow/${userId}`)
        dispatch(unfollowUserSuccess(data))
    } catch (error) {
        dispatch(unfollowUserFail(error.response.data.message))
    }
}

export const getFollowersAndFollowing = (userId) => async (dispatch) => {
    try {
        dispatch(getFollowRequest())
        const { data } = await axios.get(`/api/v1/user/getfollowersfollowing/${userId}`)
        dispatch(getFollowSuccess(data))
    } catch (error) {
        dispatch(getFollowFail(error.response.data.message))
    }
}


export const getUserFollowersAndFollowing = (userId) => async (dispatch) => {
    try {
        dispatch(getFollowersRequest())
        const { data } = await axios.get(`/api/v1/user/getuserfollowersfollowing/${userId}`)
        dispatch(getFollowersSuccess(data))
    } catch (error) {
        dispatch(getFollowersFail(error.response.data.message))
    }
}


export const createContact = (userId, formData) => async (dispatch) => {
    try {
        dispatch(contactCreateRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/user/usercontact/${userId}`, formData, config)
        dispatch(contactCreateSuccess(data))
    } catch (error) {
        dispatch(contactCreateFail(error.response.data.message))
    }
}

export const getContacts = (userId) => async (dispatch) => {
    try {
        dispatch(contactGetRequest())
        const { data } = await axios.get(`/api/v1/user/usercontact/${userId}`)
        dispatch(contactGetSuccess(data))
    } catch (error) {
        dispatch(contactGetFail(error.response.data.message))
    }
}

export const deleteContact = (userId, contactInfo) => async (dispatch) => {
    try {
        dispatch(contactDeleteRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
            data: { contactId: contactInfo }
        }
        await axios.delete(`/api/v1/user/usercontact/${userId}`, config);
        dispatch(contactDeleteSuccess());
        dispatch(getContacts(userId));
    } catch (error) {
        dispatch(contactDeleteFail(error.response.data.message))
    }
}

export const confirmPassword = (userId, formData) => async (dispatch) => {
    try {
        dispatch(deleteAccountConfirmRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }
        const { data } = await axios.post(`/api/v1/user/confirmpassword/${userId}`, formData, config)
        dispatch(deleteAccountConfirmSuccess(data))
    } catch (error) {
        dispatch(deleteAccountConfirmFail(error.response.data.message))
    }
}

export const deleteMyAccount = (userId, text) => async (dispatch) => {
    try {
        dispatch(deleteAccountRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }
        await axios.delete(`/api/v1/user/deletemyaccount/${userId}`, text, config)
        dispatch(deleteAccountSuccess())
    } catch (error) {
        dispatch(deleteAccountFail(error.response.data.message))
    }
}


export const reportUsersToUser = (userId, formData) => async (dispatch) => {
    try {
        dispatch(postReportToUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }
        const { data } = await axios.put(`/api/v1/user/reportuser/${userId}`, formData, config);
        dispatch(postReportToUserSuccess(data))
    } catch (error) {
        dispatch(postReportToUserFail(error.response.data.message))
    }
}

export const reportUsersToBlog = (blogId) => async (dispatch) => {
    try {
        dispatch(postReportToBlogRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }
        const { data } = await axios.put(`/api/v1/user/reportblog/${blogId}`, config);
        dispatch(postReportToBlogSuccess(data))
    } catch (error) {
        dispatch(postReportToBlogFail(error.response.data.message))
    }
}

export const postContactUser = (formData) => async (dispatch) => {
    try {
        dispatch(contactUserToAdminRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            },
        }
        const { data } = await axios.put(`/api/v1/user/usercontactadmin`, formData, config)
        dispatch(contactUserToAdminSuccess(data))
    } catch (error) {
        dispatch(contactUserToAdminFail(error.response.data.message))
    }
}

export const getAllUsers = ({ username }) => async (dispatch) => {
    try {
        dispatch(getAllUsersRequest())

        let queryString = ''
        if (username) {
            queryString += `&username=${username}`
        }

        const { data } = await axios.get(`/api/v1/user/getallusers?${queryString}`)
        dispatch(getAllUsersSuccess(data))
    } catch (error) {
        dispatch(getAllUsersFail(error.response.data.message))
    }
}