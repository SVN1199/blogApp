import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMyAccount } from '../../../action/usersAction'
import { toast } from 'react-toastify'
import { clearAccountDeleted, clearUsersError } from '../../../slices/usersSlice'
import { logOut } from '../../../action/userActions'

const DeleteAccount = () => {

    const { isDeleteAccount, error } = useSelector((state) => state.usersState)

    const { id: userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [text, setText] = useState('')

    const confirmWords = 'I am sure I want to delete my account.'

    const handleDelete = (e) => {
        e.preventDefault()
        if (text === confirmWords) {
            dispatch(deleteMyAccount(userId))
        } else {
            toast('Type the text if you wish to delete your account.', {
                type: 'info',
                position: 'top-center'
            })
        }
    }

    useEffect(() => {
        if (isDeleteAccount) {
            toast('Account Deleted Successfully', {
                position: 'bottom-center',
                type: 'success',
                onOpen: () => dispatch(clearAccountDeleted())
            })
            navigate('/')
            dispatch(logOut)
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearUsersError())
            })
            return
        }
    }, [dispatch, error, isDeleteAccount, navigate])


    return (
        <div className='deleteaccount'>
            <div className="deletebox">
                <p>
                    * Are you sure you want to delete your account? If you proceed with account deletion, all your data will be permanently removed from our database, and it cannot be recovered. Please confirm by entering the text below.
                </p>
                <div>
                    <b>
                        I am sure I want to delete my account.
                    </b>
                    <input
                        type="text"
                        placeholder='Enter the above line'
                        value={text}
                        name='words'
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <button
                        type='submit'
                        className='d-flex justify-content-center gap-1'
                        onClick={handleDelete}
                    >
                        <div><FaTrash /></div>
                        <div className='mt-1' style={{ fontSize: '12px' }}> Delete my Account</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount