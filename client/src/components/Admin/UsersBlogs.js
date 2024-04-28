import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBlogByAdmin, isActiveUserBlog } from '../../action/adminAction';
import { Link, useParams } from 'react-router-dom';
import { clearAdminError, isActiveUserBlogClear } from '../../slices/adminSlice';
import { toast } from 'react-toastify';
import Loader from '../layouts/Loader';

const UsersBlogs = () => {
    const dispatch = useDispatch();
    const { blogs = [], isActiveBlogUpdated, error, loading } = useSelector((state) => state.adminState);
    const { id: userId } = useParams();

    useEffect(() => {
        dispatch(getUserBlogByAdmin(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (isActiveBlogUpdated) {
            toast(`success`, {
                position : 'top-center',
                type: 'success',
                onOpen: () => dispatch(isActiveUserBlogClear())
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

    }, [dispatch, isActiveBlogUpdated, error])


    const [modalOpen, setModalOpen] = useState(false);
    const [blogId, setBlogId] = useState(null);
    const [active, setActive] = useState('Select Status');

    const handleModalOpen = (blogId) => {
        setModalOpen(true);
        setBlogId(blogId);
    };

    const handleStatusChange = (status) => {
        setActive(status);
    };

    const handleSubmit = () => {
        dispatch(isActiveUserBlog(blogId, active, userId));
        setModalOpen(false);
        setActive('Select Status');
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div className='blogreportsbox'>
            <div className="container">
                <div className="row">
                    <h5 className='mt-2 heading-topics-admin'>User Blog <div className="admin-line"></div></h5>
                    {

                        blogs.length === 0 ?
                            <div className='noblogfound'>No Blog Found</div>
                            :
                            (blogs && blogs.map(blog => (
                                <div className="col-lg-4 col-md-6 col-sm-4 col-xs-3 mt-2" key={blog._id}>
                                    <div className={`blog-admin-box ${blog.isActive ? 'blog-acitve' : 'blogdeactive'}`}>
                                        <div className="blog-admin-box-inner">
                                            <div className="blog-admin-blogimage">
                                                <img src={blog.thumbnail} alt="" />
                                            </div>
                                            <div className="blog-admin-blogcontent">
                                                <div className="blog-id-admin">
                                                    <b>_id</b> : {blog._id}
                                                </div>
                                                <div className="blog-title-admin">
                                                    <b>Title</b> : {blog.title}
                                                </div>
                                                <div className="blog-name-admin">
                                                    <b> Username</b> : {blog?.user?.name}
                                                </div>
                                                <div className="blog-button-admin">
                                                    <li><Link to={`/readblog/${blog._id}`}><button>View</button></Link></li>
                                                    <li><Link to={`/usersprofile/${blog?.user?._id}`}><button>Visit User</button></Link></li>
                                                    <li><Link to={`/admin/blog/reports/${blog._id}`}><button>Reports</button></Link></li>
                                                    <li><button onClick={() => handleModalOpen(blog._id)}><FaEye /></button></li>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))
                    }
                </div>
            </div>
            {modalOpen && (
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
            )}
        </div>
    );
};

export default UsersBlogs;
