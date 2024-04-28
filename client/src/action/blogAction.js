import axios from 'axios'
import {
    addLikeFail,
    addLikeRequest,
    addLikeSuccess,
    allBlogFail,
    allBlogRequest,
    allBlogSuccess,
    blogFail,
    blogRequest,
    blogSuccess,
    deleteBlogFail,
    deleteBlogRequest,
    deleteBlogSuccess,
    getFollowingBlogFail,
    getFollowingBlogRequest,
    getFollowingBlogSuccess,
    getSearchBlogFail,
    getSearchBlogRequest,
    getSearchBlogSuccess,
    getTrendingBlogFail,
    getTrendingBlogRequest,
    getTrendingBlogSuccess,
    newBlogFail,
    newBlogRequest,
    newBlogSuccess,
    reviewCreateFail,
    reviewCreateRequest,
    reviewCreateSuccess,
    reviewDeleteFail,
    reviewDeleteRequest,
    reviewDeleteSuccess,
    reviewGetFail,
    reviewGetRequest,
    reviewGetSuccess,
    unLikeFail, unLikeRequest, unLikeSuccess, updateBlogFail, updateBlogRequest, updateBlogSuccess
} from '../slices/blogSlice'

export const createBlog = (formData) => async (dispatch) => {
    try {
        dispatch(newBlogRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/v1/blog', formData, config)
        dispatch(newBlogSuccess(data))
    } catch (error) {
        dispatch(newBlogFail(error.response.data.message))
    }
}

export const getAllBlog = () => async (dispatch) => {
    try {
        dispatch(allBlogRequest())
        const { data } = await axios.get('/api/v1/blog')
        dispatch(allBlogSuccess(data))
    } catch (error) {
        dispatch(allBlogFail(error.response.data.message))
    }
}

export const getTrendingBlog = () => async (dispatch) => {
    try {
        dispatch(getTrendingBlogRequest())
        const { data } = await axios.get('/api/v1/blog/trending')
        dispatch(getTrendingBlogSuccess(data))
    } catch (error) {
        dispatch(getTrendingBlogFail(error.response.data.message))
    }
}

export const getSearchingBlog = (search) => async (dispatch) => {
    try {
        dispatch(getSearchBlogRequest())
        let link = '';
        if (search) {
            link = `/api/v1/blog/searchblogs?search=${search}`
        }
        const { data } = await axios.get(link)
        dispatch(getSearchBlogSuccess(data))
    } catch (error) {
        dispatch(getSearchBlogFail(error.response.data.message))
    }
}


export const getFollowingBlog = () => async (dispatch) => {
    try {
        dispatch(getFollowingBlogRequest())
        const { data } = await axios.get('/api/v1/blog/followingblogs')
        dispatch(getFollowingBlogSuccess(data))
    } catch (error) {
        dispatch(getFollowingBlogFail(error.response.data.message))
    }
}

export const getSingleBlog = (blogId) => async (dispatch) => {
    try {
        dispatch(blogRequest())
        const { data } = await axios.get(`/api/v1/blog/${blogId}`)
        dispatch(blogSuccess(data))
    } catch (error) {
        dispatch(blogFail(error.response.data.message))
    }
}

export const updateBlog = (id, blogData) => async (dispatch) => {
    try {
        dispatch(updateBlogRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/blog/${id}`, blogData, config)
        dispatch(updateBlogSuccess(data))
    } catch (error) {
        dispatch(updateBlogFail(error.response.data.message))
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        dispatch(deleteBlogRequest())
        await axios.delete(`/api/v1/blog/${id}`)
        dispatch(deleteBlogSuccess())
    } catch (error) {
        dispatch(deleteBlogFail(error.response.data.message))
    }
}

export const postComments = (blogId, userId, content) => async (dispatch) => {
    try {
        dispatch(reviewCreateRequest())
        const { data } = await axios.post(`/api/v1/blog/comments/${blogId}`, { userId, content })
        dispatch(reviewCreateSuccess(data))
    } catch (error) {
        dispatch(reviewCreateFail(error.response.data.message))
    }
}


export const getAllComments = (id) => async (dispatch) => {
    try {
        dispatch(reviewGetRequest())
        const { data } = await axios.get(`/api/v1/blog/comments/${id}`)
        dispatch(reviewGetSuccess(data))
    } catch (error) {
        dispatch(reviewGetFail(error.response.data.message))
    }
}

export const deleteComments = (blogId, userId, commentUser) => async (dispatch) => {
    try {
        dispatch(reviewDeleteRequest())
        const { data } = await axios.delete(`/api/v1/blog/comments/${blogId}`, { data: { userId, commentUser } })
        dispatch(reviewDeleteSuccess(data))
    } catch (error) {
        dispatch(reviewDeleteFail(error.response.data.message))
    }
}

export const addLikes = id => async (dispatch) => {
    try {
        dispatch(addLikeRequest())
        const { data } = await axios.put(`/api/v1/blog/like/${id}`)
        dispatch(addLikeSuccess(data))
    } catch (error) {
        dispatch(addLikeFail(error.response.data.message))
    }
}

export const unLikes = id => async (dispatch) => {
    try {
        dispatch(unLikeRequest())
        const { data } = await axios.put(`/api/v1/blog/unlike/${id}`)
        dispatch(unLikeSuccess(data))
    } catch (error) {
        dispatch(unLikeFail(error.response.data.message))
    }
}