import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogFeatures } from '../../action/adminAction'
import Loader from '../layouts/Loader'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { totalLikes, totalComments, totalViews,  totalUsers,  totalBlogs, loading } = useSelector((state) => state.adminState)

    useEffect(() => {
        dispatch(getBlogFeatures())
    }, [dispatch])

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            <div className="container">
                <h5 className='mt-5'>Dashboard <div className="admin-line"></div></h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="admin-dash-box">
                            <li>Users</li>
                            <li>{totalUsers}</li>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="admin-dash-box">
                            <li>Posts</li>
                            <li>{totalBlogs}</li>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="admin-dash-box">
                            <li>Views</li>
                            <li>{totalViews}</li>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="admin-dash-box">
                            <li>Likes</li>
                            <li>{totalLikes}</li>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="admin-dash-box">
                            <li>Comments</li>
                            <li>{totalComments}</li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard