import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogsByAdmin, isActiveToBlog } from '../../action/adminAction'
import { FaEye, FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { clearAdminError, isActiveToBlogUpdatedClear } from '../../slices/adminSlice'
import { toast } from 'react-toastify'
import Loader from '../layouts/Loader'

const BlogsAdmin = () => {

  const dispatch = useDispatch()

  const { allBlogs = [], error, loading, isActiveToBlogUpdated } = useSelector((state) => state.adminState)

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getAllBlogsByAdmin({ blogId: null }))

    if (isActiveToBlogUpdated) {
      toast('success', {
        position : 'top-center',
        type: 'success',
        onOpen: () => dispatch(isActiveToBlogUpdatedClear())
      })
    }


    if (error) {
      toast(error, {
        position : 'top-center',
        type: 'error',
        onOpen: () => dispatch(clearAdminError())
      })
      return
    }
  }, [dispatch, isActiveToBlogUpdated, error])

  const handleSearch = () => {
    dispatch(getAllBlogsByAdmin({ blogId: searchQuery }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const formData = new FormData()
    formData.append('blogId', blogId)
    formData.append('active', active)
    dispatch(isActiveToBlog(formData))
    setModalOpen(false);
    setActive('Select Status')
  };

  if (loading) {
    return <Loader />
  }

  return (
    <div className='blogreportsbox' >
      <div className='user-admin-input'>
        <input
          type="text"
          placeholder='Search Blogs By Id...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}><FaSearch /></button>
      </div>
      <div className="container mt-2">
        <h5 className='mt-2 heading-topics-admin'>Blogs <div className="admin-line"></div></h5>
        <div className="row">
          {
            allBlogs.length === 0 ?
              <div className='text-center text-dark text-bold mt-5'>
                No Blog Found
              </div>
              :
              (allBlogs.map(blog => (
                <div className="col-lg-3 col-md-4 col-sm-12 mt-2" key={blog._id}>
                  <div className={`report-blog1-box ${blog.isActive ? 'allActive' : 'allDeactive'}`}>
                    <img src={blog.thumbnail} alt="" />
                    <div className="report-blog-category"><b>Category : {blog.category}</b></div>
                    <div className="report-blog-title">
                      <b>Title :</b> {blog.title}
                    </div>
                    <div className="blog-report-user-btn">
                      <button><Link to={`/readblog/${blog._id}`} style={{ color: 'black', textDecoration: 'none' }}>View</Link></button>
                      <button><Link to={`/admin/blog/reports/${blog._id}`} style={{ color: 'black', textDecoration: 'none' }}>Reports</Link></button>
                      <button onClick={() => handleModalOpen(blog._id)}><FaEye /></button>
                    </div>
                  </div>
                </div>
              )))
          }
        </div>
      </div>

      {
        isModalOpen &&
        <div className="modal-reports-blog">
          <b className='text-center text-white'> <p>Blog ID copied to clipboard!</p></b>
          <div>
            <button onClick={() => setIsModalOpen(false)} style={{ width: '100%' }}>Ok</button>
          </div>
        </div>
      }

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
  )
}

export default BlogsAdmin