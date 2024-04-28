import React, { useEffect, useState } from 'react'
import { FaEye, FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersByAdmin, isActiveUserPost } from '../../action/adminAction'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAdminError, isActiveUserPostClear } from '../../slices/adminSlice'
import Loader from '../layouts/Loader'

const Users = () => {


    const dispatch = useDispatch()
    const { users = [], isActiveUserUpdated, error, loading } = useSelector((state) => state.adminState)


    const [modalOpen, setModalOpen] = useState(false)

    const [userId, setUserId] = useState(null)
    const [active, setActive] = useState('Select Status')

    const handleModalOpen = (userId) => {
        setModalOpen(true)
        setUserId(userId)
    }

    const handleStatusChange = (status) => {
        setActive(status);
    };

    const handleSubmit = () => {
        dispatch(isActiveUserPost(userId, active))
        setModalOpen(false)
        setActive('Select Status')
    }

    useEffect(() => {
        if (isActiveUserUpdated) {
            toast(`success`, {
                position : 'top-center',
                type: 'success',
                onOpen: () => dispatch(isActiveUserPostClear())
            })
            return
        }

        if (error) {
            toast(error, {
                position : 'top-center',
                type: 'error',
                onOpen: () => dispatch(clearAdminError())
            })
            return
        }

    }, [dispatch, isActiveUserUpdated, error])


    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllUsersByAdmin({ userId: null }))
    }, [dispatch])

    const handleSearch = () => {
        dispatch(getAllUsersByAdmin({ userId: searchQuery }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    if (loading) {
        return <Loader />
    }

    return (
        <div className='blogreportsbox'>
            <div className='user-admin-input'>
                <input
                    type="text"
                    placeholder='Search Users By Id...'
                    value={searchQuery}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}><FaSearch /></button>
            </div>
            <div className="container">
                <h5 className='mt-2 heading-topics-admin'>Users <div className="admin-line"></div></h5>
                <div className="row">
                    {
                        users.length === 0 ?
                            <div className='text-center text-dark no-userfound-admin bold mt-5'>
                                No Users Found
                            </div>
                            :
                            (users && users.map(user => (
                                <div
                                    className="col-lg-4 col-md-6 col-sm-12"
                                    key={user._id}
                                >
                                    <div
                                        className=
                                        'admin-users-box'
                                        style={user.isActive ? { backgroundColor: '#70f' } : { backgroundColor: 'red' }}
                                    >
                                        <div className="user-icon-eye">
                                            <FaEye onClick={() => handleModalOpen(user._id)} />
                                        </div>
                                        <div className="user-admin-upper">
                                            <img src={user.avatar ||  '/images/user-avatar.png'} alt="Avatar" />
                                            <div className='user-admin-nameid'>
                                                <div className="user-admin-id">_id : {user._id}</div>
                                                <div className="user-admin-name">Name : {user.name}</div>
                                            </div>
                                        </div>
                                        <div className="user-admin-lower">
                                            <li><Link to={`/usersprofile/${user._id}`}><button>View Page</button></Link></li>
                                            <li><Link to={`/admin/users/blog/${user._id}`}><button>View Blogs</button></Link></li>
                                            <li><Link to={`/admin/user/reports/${user._id}`}><button>View Reports</button></Link></li>
                                        </div>
                                    </div>
                                </div>
                            )))
                    }
                </div>
            </div>
            {
                modalOpen &&
                <div className="modal-admin-user1">
                    <div>
                        <div className="select-wrapper">
                            <select
                                name="userStatus"
                                id="userStatus"
                                onChange={(e) => handleStatusChange(e.target.value)}
                                value={active}
                            >
                                <option value="Select Status" disabled>Select Status</option>
                                <option value="active">Active</option>
                                <option value="deactive">Deactive</option>
                                <option value="terminate" style={{ backgroundColor: 'red' }}>Terminate</option>
                            </select>
                        </div>
                        <div className="modal-button-admin">
                            <button onClick={() => setModalOpen(false)}>Cancel</button>
                            <button onClick={handleSubmit}>Ok</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Users