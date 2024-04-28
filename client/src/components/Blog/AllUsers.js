import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../action/usersAction'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Loading from '../layouts/Loading'

const AllUsers = () => {

    const { allUsers = [], loading } = useSelector((state) => state.usersState)

    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(getAllUsers({ username: null }))
    }, [dispatch])

    const handleSearch = () => {
        dispatch(getAllUsers({ username: searchQuery }));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className='allusers'>
            <div className="container"><br /><br /><br />
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="searchinput">
                            <input
                                type="text"
                                placeholder='Search User By Name...'
                                value={searchQuery}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div onClick={handleSearch}><FaSearch /></div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div><br />
                <div className="row">
                    {
                        allUsers.length === 0 ?
                            <div className='no-blog-found'>No User Found</div>
                            :
                            (allUsers?.map(user => (
                                <div className="col-lg-4 col-md-6 col-sm-12" key={user._id}>
                                    <motion.div
                                        className="box"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ opacity: 1, scale: 1.05 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: [0, 0.71, 0.2, 1.01],
                                            scale: {
                                                type: "spring",
                                                damping: 5,
                                                stiffness: 100,
                                                restDelta: 0.001
                                            }
                                        }}
                                    >
                                        <div className="allusers-box">
                                            <img src={user.avatar || '/images/user-avatar.png'} alt="" />
                                            <div className="inner-allusersbox">
                                                <div className="allusers-name">{user.name}</div>
                                                <div className='allusers-btn'>
                                                    <Link to={`/usersprofile/${user._id}`}>
                                                        <button>View Page</button>
                                                    </Link>
                                                    <Link to={`/usersblogs/${user._id}`}>
                                                        <button>View Blogs</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                </div>
                            )))
                    }
                </div>
            </div>
        </div>
    )
}

export default AllUsers