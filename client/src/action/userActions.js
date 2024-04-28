import {
    clearError,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    loginFail,
    loginRequest,
    loginSuccess,
    registerFail,
    registerRequest,
    registerSuccess,
    logoutSuccess,
    logoutFail,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice'

import axios from 'axios'

export const register = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest())
        const { data } = await axios.post('/api/v1/user/', userData)
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }
}

export const login = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest())
        const { data } = await axios.post('/api/v1/user/login', userData)
        dispatch(loginSuccess(data))
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
    }
}

export const loadUser = async (dispatch) => {
    try {
        dispatch(loadUserRequest())
        const { data } = await axios.get('/api/v1/user/getuser')
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message))
    }
}

export const logOut = async (dispatch) => {
    try {
        await axios.get('/api/v1/user/logout')
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error.response.data.message))
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch(changePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/user/changepassword', formData, config)
        dispatch(changePasswordSuccess(data))
    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message))
    }
}

export const updateprofile = (formData) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put(`/api/v1/user`, formData, config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}


export const forgotpassword = (formData) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/user/forgotpassword`, formData, config)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message))
    }
}

export const resetpassword = (formData, token) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/user/resetpassword/${token}`, formData, config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message))
    }
}

