import axios from 'axios'
import { deleteBlogReportFail, deleteBlogReportRequest, deleteBlogReportSuccess, deleteContactFail, deleteContactRequest, deleteContactSuccess, deleteUserReportFail, deleteUserReportRequest, deleteUserReportSuccess, getAllBlogByAdminFail, getAllBlogByAdminRequest, getAllBlogByAdminSuccess, getAllReportFail, getAllReportRequest, getAllReportSuccess, getAllUsersByAdminFail, getAllUsersByAdminRequest, getAllUsersByAdminSuccess, getBlogFeatursFail, getBlogFeatursRequest, getBlogFeatursSuccess, getBlogReportFail, getBlogReportRequest, getBlogReportSuccess, getContactByAdminFail, getContactByAdminRequest, getContactByAdminSuccess, getUserBlogFail, getUserBlogRequest, getUserBlogSuccess, getUserReportFail, getUserReportRequest, getUserReportSuccess, isActiveToBlogFail, isActiveToBlogRequest, isActiveToBlogSuccess, isActiveUserBlogFail, isActiveUserBlogRequest, isActiveUserBlogSuccess, isActiveUserPostFail, isActiveUserPostRequest, isActiveUserPostSuccess } from '../slices/adminSlice'

export const getBlogFeatures = () => async (dispatch) => {
    try {
        dispatch(getBlogFeatursRequest())
        const { data } = await axios.get(`/api/v1/admin`)
        dispatch(getBlogFeatursSuccess(data))
    } catch (error) {
        dispatch(getBlogFeatursFail(error.response.data.message))
    }
}

export const getAllUsersByAdmin = ({userId}) => async (dispatch) => {
    try {
        dispatch(getAllUsersByAdminRequest())
        
        let queryString = ''
        if(userId) queryString += `&userId=${userId}`

        const { data } = await axios.get(`/api/v1/admin/users?${queryString}`)
        dispatch(getAllUsersByAdminSuccess(data))
    } catch (error) {
        dispatch(getAllUsersByAdminFail(error.response.data.message))
    }
}

export const isActiveUserPost = (userId, active) => async (dispatch) => {
    try {
        dispatch(isActiveUserPostRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/users/isactiveuser`, { userId, active }, config)
        dispatch(isActiveUserPostSuccess(data))
        dispatch(getAllUsersByAdmin(data))
    } catch (error) {
        dispatch(isActiveUserPostFail(error.response.data.message))
    }
}

export const isActiveUserBlog = (blogId, active, userId) => async (dispatch) => {
    try {
        dispatch(isActiveUserBlogRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/users/isactiveblog`, { blogId, active }, config)
        dispatch(isActiveUserBlogSuccess(data))
        dispatch(getUserBlogByAdmin(userId))
    } catch (error) {
        dispatch(isActiveUserBlogFail(error.response.data.message))
    }
}

export const getUserBlogByAdmin = (userId) => async (dispatch) => {
    try {
        dispatch(getUserBlogRequest())
        const { data } = await axios.get(`/api/v1/admin/users/blogs/${userId}`)
        dispatch(getUserBlogSuccess(data))
    } catch (error) {
        dispatch(getUserBlogFail(error.response.data.message))
    }
}


export const getReportUser = (userId) => async (dispatch) => {
    try {
        dispatch(getUserReportRequest())
        const { data } = await axios.get(`/api/v1/admin/getuserreports/${userId}`)
        dispatch(getUserReportSuccess(data))
    } catch (error) {
        dispatch(getUserReportFail(error.response.data.message))
    }
}

export const getReportBlog = (blogId) => async (dispatch) => {
    try {
        dispatch(getBlogReportRequest())
        const { data } = await axios.get(`/api/v1/admin/getblogreports/${blogId}`)
        dispatch(getBlogReportSuccess(data))
    } catch (error) {
        dispatch(getBlogReportFail(error.response.data.message))
    }
}

export const getContactByAdmin = () => async (dispatch) => {
    try {
        dispatch(getContactByAdminRequest())
        const { data } = await axios.get('/api/v1/admin/usercontactadmin')
        dispatch(getContactByAdminSuccess(data))
    } catch (error) {
        dispatch(getContactByAdminFail(error.response.data.message))
    }
}

export const deleteUserReportByAdmin = (userId, formData) => async (dispatch) => {
    try {
        dispatch(deleteUserReportRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/deleteuserreports/${userId}`, formData, config)
        dispatch(deleteUserReportSuccess(data))
    } catch (error) {
        dispatch(deleteUserReportFail(error.response.data.message))
    }
}


export const deleteBlogReportByAdmin = (blogId, formData) => async (dispatch) => {
    try {
        dispatch(deleteBlogReportRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/deleteblogreports/${blogId}`, formData, config)
        dispatch(deleteBlogReportSuccess(data))
    } catch (error) {
        dispatch(deleteBlogReportFail(error.response.data.message))
    }
}


export const deleteContactByAdmin = (messageId) => async (dispatch) => {
    try {
        dispatch(deleteContactRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/deleteusercontactadmin`, messageId, config)
        dispatch(deleteContactSuccess(data))
    } catch (error) {
        dispatch(deleteContactFail(error.response.data.message))
    }
}

export const getAllReports = () => async (dispatch) => {
    try {
        dispatch(getAllReportRequest())
        const { data } = await axios.get(`/api/v1/admin/getallreports`)
        dispatch(getAllReportSuccess(data))
    } catch (error) {
        dispatch(getAllReportFail(error.response.data.message))
    }
}

export const getAllBlogsByAdmin = ({ blogId }) => async (dispatch) => {
    try {
        dispatch(getAllBlogByAdminRequest())

        let queryString = '';
        if (blogId) queryString += `&blogId=${blogId}`;

        const { data } = await axios.get(`/api/v1/admin/blogs?${queryString}`)
        dispatch(getAllBlogByAdminSuccess(data))
    } catch (error) {
        dispatch(getAllBlogByAdminFail(error.response.data.message))
    }
}

export const isActiveToBlog = (formData) => async (dispatch) => {
    try {
        dispatch(isActiveToBlogRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/activetoblog`, formData, config)
        dispatch(isActiveToBlogSuccess(data))
        dispatch(getAllBlogsByAdmin(data))
    } catch (error) {
        dispatch(isActiveToBlogFail(error.response.data.message))
    }
}