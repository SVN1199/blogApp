import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearAuthError, resetpassword } from '../../action/userActions';
import { toast } from 'react-toastify';

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.authState)
    const navigate = useNavigate();
    const { token } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetpassword(formData, token))
    }

    useEffect(()=> {
        if(isAuthenticated) {
            toast('Password Reset Success!', {
                type: 'success',
                position : 'bottom-center'
            })
            navigate('/')
            return;
        }
        if(error)  {
            toast(error, {
                position : 'bottom-center',
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[isAuthenticated, error, dispatch, navigate])

    return (
        <div className='forgotpassword'>
            <div className="inputbox">
                <div className="forgot-heading">
                    Reset Password
                </div>
                <form onSubmit={handleSubmit}>
                    <label >Password</label><br />
                    <input
                        type="text"
                        placeholder='Enter Your Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    /><br />
                    <label >Confirm Password</label><br />
                    <input
                        type="text"
                        placeholder='Enter Your Confirm Password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    /><br />
                    <button>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword