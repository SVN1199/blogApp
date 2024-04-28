import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import usersReducer from './slices/usersSlice';
import adminReducer from './slices/adminSlice';

const reducer = combineReducers({
    authState: authReducer,
    blogState : blogReducer,
    usersState : usersReducer,
    adminState : adminReducer,
})

const store = configureStore({
    reducer,
})

export default store;