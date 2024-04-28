import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAuthError, register } from '../../action/userActions'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, error } = useSelector((state) => state.authState)

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(()=>{
        if(isAuthenticated){
            toast('Registered Successfully', {
                position : 'bottom-center',
                type : 'success'
            })
        }
    },[isAuthenticated])

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState("./images/user-avatar.png")

    const { name, email, password } = userData


    const onchange = (e) => {
        if (e.target.name === 'avatar' && e.target.files[0]) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })
        }
    }

    const onsubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(() => {
        if (isAuthenticated) {
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

    }, [isAuthenticated, navigate, dispatch, error])

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
                                        Register
                                    </div>
                                    <input type="text" placeholder='Name' onChange={onchange} name='name' value={name} />
                                    <input type="text" placeholder='Email' onChange={onchange} name='email' value={email} />
                                    <input type="password" placeholder='Password' onChange={onchange} name='password' value={password} />
                                    <div className='regis_avatar'>
                                        <img src={avatarPreview} alt='Avatar' />
                                        <div>
                                            <input
                                                type="file"
                                                name='avatar'
                                                onChange={onchange}
                                            />
                                            <label htmlFor="">Choose Avatar</label>
                                        </div>
                                    </div>
                                    <button>SIGN UP</button>
                                    <div className="auth_desc">
                                        Already Registered ?
                                        <Link to='/login'
                                            className='link'
                                            style={{ textDecoration: 'none', color: 'blue' }}
                                        > SIGN IN</Link>
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

export default Register