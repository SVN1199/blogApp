import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContactByAdmin, getContactByAdmin } from '../../action/adminAction'
import { Link } from 'react-router-dom'
import { RxCross2 } from 'react-icons/rx'
import { clearAdminError, clearContactDeleted } from '../../slices/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../layouts/Loader'

const AdminMessages = () => {

    const { messages = [], error, isContactDeleted, loading } = useSelector((state) => state.adminState)

    const dispatch = useDispatch()

    useEffect(() => {

        if (isContactDeleted) {
            toast('Removed', {
                position:'top-center',
                type: 'success',
                onOpen: () => dispatch(clearContactDeleted())
            })
        }

        if (error) {
            toast(error, {
                position : 'top-center',
                type: 'error',
                onOpen: () => dispatch(clearAdminError())
            })
        }

        dispatch(getContactByAdmin())
    }, [dispatch, error, isContactDeleted])

    const [toggle, setToggle] = useState(false)

    const [messageId, setMessageId] = useState(null)

    const handleToggle = (blogId) => {
        setToggle(true)
        setMessageId(blogId)
    }

    const handleDelete = () => {
        const formData = new FormData()
        formData.append('messageId', messageId)
        dispatch(deleteContactByAdmin(formData))
        setToggle(false)
        setMessageId('')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='blogreportsbox'>
            <div className="container">
                <div className="row">
                    <h5 className='mt-2 heading-topics-admin'>Messages <div className="admin-line"></div></h5>
                    {
                        messages.length === 0 ?
                            <div className='text-center mt-5'><b>No Messages</b></div> :
                            (
                                messages.map(message => (
                                    <div className="col-md-12" key={message._id}>
                                        <div className="mesbox">
                                            <div className="report-icon-msg">
                                                <RxCross2
                                                    onClick={() => handleToggle(message._id)}
                                                />
                                            </div>
                                            <div className='msguserdetails'>
                                                <Link to={`/usersprofile/${message?.userId?._id}`}>
                                                    <div><img src={message?.userId?.avatar || '/images/user-avatar.png'} alt="" /></div>
                                                </Link>
                                                <div className="useridmes">
                                                    <b>_id</b> :  {message?.userId?._id} <br />
                                                    <b>Name</b> : {message?.userId?.name} <br />
                                                </div>
                                            </div>
                                            <div className="msgusercontact">
                                                <b>Message</b> :    {message?.contactAdminInfo}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                    }
                </div>
            </div>

            {
                toggle &&
                <div className="modal-reports-blog">
                    <b className='text-center text-white'>Are Your Sure to remove ?</b>
                    <div>
                        <button onClick={() => setToggle(false)}>Cancel</button>
                        <button onClick={handleDelete}>Ok</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminMessages