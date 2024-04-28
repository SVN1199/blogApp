import React, { useEffect, useState } from 'react'
import Blogreports from './reports/Blogreports'
import Userreports from './reports/Userreports'
import { getAllReports } from '../../action/adminAction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader';

const Adminreports = () => {

    const dispatch = useDispatch();
    const { blogReports = [], userReports = [], loading } = useSelector((state) => state.adminState);

    useEffect(() => {
        dispatch(getAllReports())
    }, [dispatch])

    const [blogComponents, setBlogComponents] = useState(true)
    const [userComponents, setUserComponents] = useState(false)

    const handleBlogs = () => {
        setBlogComponents(true)
        setUserComponents(false)
    }

    const handleUsers = () => {
        setBlogComponents(false)
        setUserComponents(true)
    }

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="box-adminreports">
                        <div>
                            <button onClick={handleBlogs}>Blogs</button>
                            <button onClick={handleUsers}>Users</button>
                        </div>
                    </div>
                    <h5 className='mt-2 heading-topics-admin'>Reports - {blogComponents ? "Blog" : "User"}<div className="admin-line"></div></h5>

                    {blogComponents && <Blogreports blogs={blogReports} />}
                    {userComponents && <Userreports users={userReports} />}

                </div>
            </div>
        </div>
    )
}

export default Adminreports