import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearAuthError, login } from '../../action/userActions'
import { toast } from 'react-toastify'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, error } = useSelector((state) => state.authState)


  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = userData


  const onchange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onsubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  useEffect(() => {
    if (isAuthenticated) {
      toast('LoggedIn Successfully', {
        position: 'bottom-center',
        type: 'success'
      })
      navigate('/')
      return
    }

    if (error) {
      toast(error, {
        position: 'bottom-left',
        type: 'error',
        onOpen: () => dispatch(clearAuthError)
      })
      return
    }
  }, [dispatch, navigate, error, isAuthenticated])


  return (
    <div className='authbody'>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <div className="auth">
              <div className="upper">
                <div className="upper_body">
                  <div className="title">
                    Welcome To Spark
                  </div>
                  <q>Exploring the Unseen Realms of Knowledge</q>
                </div>
              </div>
              <div className="lower">
                <form onSubmit={onsubmit}>
                  <div className="heading">
                    Login
                  </div>
                  <input type="email" required placeholder='Email' onChange={onchange} name='email' value={email} />
                  <input type="password" required placeholder='Password' onChange={onchange} name='password' value={password} />
                  <button>SIGN IN</button>
                  <div className="auth_changepassword">
                    <Link to='/forgotpassword'>Forgot Password ?</Link>
                  </div>
                  <div className="auth_desc">
                    New User ?
                    <Link to='/register'
                      className='link'
                      style={{ textDecoration: 'none', color: 'blue' }}
                    > SIGN UP</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Login