import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getPostByUser } from '../../../action/usersAction';
import { deleteBlog } from '../../../action/blogAction';
import { toast } from 'react-toastify';
import { clearBlogDeleted } from '../../../slices/blogSlice';

const EditPosts = () => {

    const { id: userId } = useParams()
    const dispatch = useDispatch()

    const { isBlogDeleted } = useSelector((state) => state.blogState)

    const {
        userposts: user = [],
    } = useSelector((state) => state.usersState)

    useEffect(() => {
        if (userId) {
            dispatch(getPostByUser(userId))
        }

        if (isBlogDeleted) {
            toast('Blog Deleted Successfully', {
                position: 'bottom-center',
                type: 'success',
                onOpen: () => dispatch(clearBlogDeleted())
            })
        }

    }, [dispatch, userId, isBlogDeleted])

    const [deletePostId, setDeletePostId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        if (deletePostId) {
            dispatch(deleteBlog(deletePostId));
            setDeletePostId(null);
            setShowModal(false);
            dispatch(getPostByUser(userId))
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = user.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(user.length / itemsPerPage);

    const firstPage = () => setCurrentPage(1);
    const lastPage = () => setCurrentPage(totalPages);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const calculateSI = (index) => {
        return (currentPage - 1) * itemsPerPage + index + 1;
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        if (totalPages <= 2) {
            return (
                <>
                    {pageNumbers.map((number) => (
                        <button key={number} onClick={() => paginate(number)}>
                            {number}
                        </button>
                    ))}
                </>
            );
        } else {
            return (
                <>
                    <button onClick={firstPage}>First</button>
                    <button onClick={prevPage}>Prev</button>
                    {pageNumbers.slice(0, 2).map((number) => (
                        <button key={number} onClick={() => paginate(number)}>
                            {number}
                        </button>
                    ))}
                    <button>...</button>
                    <button onClick={lastPage}>{totalPages}</button>
                    <button onClick={nextPage}>Next</button>
                </>
            );
        }
    };

    return (
        <div className="editprofileclass"><br /><br /><br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                       {
                        user.length === 0 ? 
                        <div className='createblog-post'>Sorry, you have no blogs yet. Please post your 
                            <Link className='mx-1' to={`/createblogs`} style={{textDecoration : 'none', color : 'yellow'}}>Blogs</Link>.
                        </div> : 
                        <div className="table-container editposts" style={{ overflowX: 'auto' }}>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }} scope="col">SI No.</th>
                                    <th style={{ width: '15%' }} scope="col">Thumbnail</th>
                                    <th style={{ width: '68%' }} scope="col">Title</th>
                                    <th style={{ width: '12%' }} scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItems.map((post, index) => (
                                        <tr key={index}>
                                            <th scope="row">{calculateSI(index)}</th>
                                            <td><img className='edituserimg' src={post.thumbnail} alt="" /></td>
                                            <td className='editposttitle'>{post.title}
                                            </td>
                                            <td>
                                                <div>
                                                    <Link to={`/readblog/${post._id}`}><li><FaEye /></li></Link>
                                                    <Link to={`/edit/${post._id}`}><li><FaEdit /></li></Link>
                                                    <Link>
                                                        <li>
                                                            <FaTrash
                                                                onClick={() => {
                                                                    setDeletePostId(post._id);
                                                                    setShowModal(true);
                                                                }} />
                                                        </li>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </table>
                        <div className='paginationclass'>
                            {renderPageNumbers()}
                        </div>
                    </div>
                       }
                    </div>
                    <div className="col-md-1"></div>
                </div><br /><br /><br /><br />
            </div>
            {showModal && (
                <div className="modalbox shadow-lg">
                    <div className="modal-content">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this blog?</p>
                        <div className="modal-buttons">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={handleDelete}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPosts;
