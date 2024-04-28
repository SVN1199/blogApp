import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { confirmPassword } from '../../../action/usersAction'
import { useNavigate, useParams } from 'react-router-dom'
import { clearDeleteAccountConfirmFail, clearUsersError } from '../../../slices/usersSlice'

const ConfirmPassword = () => {

    const { confirmation, error } = useSelector((state) => state.usersState)
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id: userId } = useParams()

    useEffect(() => {
        if (confirmation) {
            toast('Password confirmation successful.', {
                position: "bottom-center",
                type: 'success',
                onOpen: () => dispatch(clearDeleteAccountConfirmFail())
            })
            navigate(`/deleteaccount/${userId}`)
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => { dispatch(clearUsersError()) }
            })
        }
    }, [confirmation, navigate, userId, error, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== '') {
            const formData = new FormData()
            formData.append('password', password)
            dispatch(confirmPassword(userId, formData))
        } else {
            toast('Please fill the password', {
                type: 'error',
                position: 'top-center'
            })
        }
    }

    return (
        <div className='confirmpassword'>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div className="confirmpassword-box">
                            <h5>Confirm Password</h5>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPassword