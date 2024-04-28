import React, { useEffect, useState } from 'react'
import { useDispatch,  useSelector } from 'react-redux';
import { clearAuthError, updatePassword } from '../../action/userActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const { isUpdated, error } = useSelector((state) => state.authState)

    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePassword(formData))
    }

    useEffect(() => {

        if (isUpdated) {
            toast('Password Updated Successfully', {
                position: 'bottom-center',
                type: 'success',
            })
            setOldPassword("");
            setPassword("")
            navigate('/blogs')
            return;
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearAuthError)
            })
            return;
        }

    }, [dispatch, isUpdated, error, navigate])

    return (
        <div className="changepasswordbody">
            <div className="changepassword">
                <h5 className='text-center'>Update Password</h5><div className="lineh"></div>
                <form onSubmit={onsubmit}>
                    <div>
                        <label>Old Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your Old Password'
                            name='oldPassword'
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>New Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your New Password'
                            name='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword