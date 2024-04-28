import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, forgotpassword } from '../../action/userActions'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const { error, message } = useSelector((state) => state.authState)

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotpassword(formData))
    }

    useEffect(() => {

        if (message) {
            toast(message, {
                type: 'success',
                position: 'bottom-center'
            })
            setEmail("");
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearAuthError())
            })
            return
        }
    }, [dispatch, error, message])

    return (
        <div className='forgotpassword shadow-lg'>
        <div className="container">
            <div className="row">
                <div className=" col-lg-4 col-md-6 col-sm-12"></div>
                <div className=" col-lg-4 col-md-6 col-sm-12">
                        <div className="inputbox">
                            <div className="forgot-heading">
                                Forgot Password
                            </div>
                            <form onSubmit={handleSubmit}>
                                <label >Email</label><br />
                                <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                /><br />
                                <button>SUBMIT</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className=" col-lg-4 col-md-6 col-sm-12"></div>
            </div>
        </div>
    )
}

export default ForgotPassword