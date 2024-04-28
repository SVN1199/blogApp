import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/Blog/Main'
import Contact from './components/Blog/Contact'
import Blogs from './components/Blog/Blogs'
import BlogsAdmin from './components/Admin/BlogsAdmin'
import CreateBlog from './components/Blog/CreateBlog'
import ReadBlog from './components/Blog/ReadBlog'
import UserProfile from './components/Blog/UserProfile'
import Trending from './components/Blog/home/Trending'
import Home from './components/Blog/home/Home'
import Layout from './components/layouts/Layout'
import ChangePassword from './components/auth/ChangePassword'
import UpdateProfile from './components/Blog/userprofile/UpdateProfile'
import AboutForm from './components/Blog/userprofile/AboutForm'
import SavedBlog from './components/Blog/userprofile/SavedBlog'
import EditPosts from './components/Blog/userprofile/EditPosts'
import Search from './components/Blog/Search'
import Following from './components/Blog/Following'
import EditBlog from './components/Blog/EditBlog'
import ProtectedRoute from './components/route/ProtectedRoute'
import store from './store'
import { loadUser } from './action/userActions'
import UserFollow from './components/Blog/userprofile/UserFollow'
import Aboutsite from './components/Aboutsite'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import ReceivedMsg from './components/Blog/userprofile/ReceivedMsg'
import DeleteAccount from './components/Blog/userprofile/DeleteAccount'
import Adminpage from './components/Admin/Adminpage'
import Admindashboard from './components/layouts/Admindashboard'
import Dashboard from './components/Admin/Dashboard'
import Users from './components/Admin/Users'
import UsersBlogs from './components/Admin/UsersBlogs'
import BlogReports from './components/Admin/BlogReports'
import UserReports from './components/Admin/UserReports'
import AdminMessages from './components/Admin/AdminMessages'
import Adminreports from './components/Admin/Adminreports'
import AllUsers from './components/Blog/AllUsers'
import UserBlogs from './components/Blog/UserBlogs'
import ConfirmPassword from './components/Blog/userprofile/ConfirmPassword'

const App = () => {
  useEffect(() => {
      store.dispatch(loadUser);
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/resetpassword/:token' element={<ResetPassword />} />
          <Route path='/home' element={<Layout><Home /></Layout>} />
          <Route path='/blogs' element={<Layout><Blogs /></Layout>} />
          <Route path='/search' element={<Layout><Search /></Layout>} />
          <Route path='/trending' element={<Layout><Trending /></Layout>} />

          <Route path='/blogs/users' element={<ProtectedRoute><Layout><AllUsers /></Layout></ProtectedRoute>} />
          <Route path='/followingfeeds' element={<ProtectedRoute><Layout><Following /></Layout></ProtectedRoute>} />
          <Route path='/changepassword' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
          <Route path='/updateprofile/:id' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
          <Route path='/aboutuser/:id' element={<ProtectedRoute><AboutForm /></ProtectedRoute>} />
          <Route path='/' element={<Main />} />
          <Route path='/savedblogs/:id' element={<ProtectedRoute><Layout><SavedBlog /></Layout></ProtectedRoute>} />
          <Route path='/updateordelete/:id' element={<ProtectedRoute><Layout><EditPosts /></Layout></ProtectedRoute>} />
          <Route path='/usersprofile/:id' element={<ProtectedRoute><Layout><UserProfile /></Layout></ProtectedRoute>} />
          <Route path='/usersblogs/:id' element={<ProtectedRoute><Layout><UserBlogs /></Layout></ProtectedRoute>} />
          <Route path='/createblogs' element={<ProtectedRoute><Layout><CreateBlog /></Layout></ProtectedRoute>} />
          <Route path='/readblog/:id' element={<ProtectedRoute><ReadBlog /></ProtectedRoute>} />
          <Route path='/userfollow/:id' element={<Layout><ProtectedRoute><UserFollow /></ProtectedRoute></Layout>} />
          <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path='/edit/:id' element={<ProtectedRoute><Layout><EditBlog /></Layout></ProtectedRoute>} />
          <Route path='/receivedmsg/:id' element={<ProtectedRoute><Layout><ReceivedMsg /></Layout></ProtectedRoute>} />
          <Route path='/deleteaccount/:id' element={<ProtectedRoute><Layout><DeleteAccount /></Layout></ProtectedRoute>} />
          <Route path='/confirmpassword/:id' element={<ProtectedRoute><Layout><ConfirmPassword /></Layout></ProtectedRoute>} />
          <Route path='/about' element={<Aboutsite />} />

          <Route path='/admin' element={<ProtectedRoute isAdmin={true}><Admindashboard><Adminpage /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Admindashboard><Dashboard /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><Admindashboard><Users /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/blogs' element={<ProtectedRoute isAdmin={true}><Admindashboard><BlogsAdmin /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/users/blog/:id' element={<ProtectedRoute isAdmin={true}><Admindashboard><UsersBlogs /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/blog/reports/:id' element={<ProtectedRoute isAdmin={true}><Admindashboard><BlogReports /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/user/reports/:id' element={<ProtectedRoute isAdmin={true}><Admindashboard><UserReports /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/messages' element={<ProtectedRoute isAdmin={true}><Admindashboard><AdminMessages /></Admindashboard></ProtectedRoute>} />
          <Route path='/admin/reports' element={<ProtectedRoute isAdmin={true}><Admindashboard><Adminreports /></Admindashboard></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme='dark' />
    </div>
  )
}

export default App