import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { getSearchingBlog } from '../../action/blogAction'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import ReactTimeago from 'react-timeago';
import { clearBlogError } from '../../slices/blogSlice';
import Loading from '../layouts/Loading';

const Search = () => {

  const { searchBlogs: blogs = [], error, loading } = useSelector((state) => state.blogState)

  const dispatch = useDispatch()

  const [search, setSearch] = useState('')

  const handleSearch = () => {
    dispatch(getSearchingBlog(search))
    setSearch('')
  }

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  useEffect(() => {
    if (error) {
      toast(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => dispatch(clearBlogError())
      })
      return
    }
  }, [error, blogs, dispatch])

  const trimTitle = (title) => {
    return title.length > 60 ? `${title.substring(0, 60)}...` : title;
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className='search'><br /><br /><br />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="searchinput">
              <input
                type="text"
                placeholder='Search text by blog title, content, and category.'
                name='search'
                value={search}
                onKeyDown={handleEnterKey}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={handleSearch}><FaSearch /></div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
        <br />
        <div className="row">
          {
            blogs.length === 0 ?
              <div className='messageforsearch'>Find Your Favorite Blog by Searching...</div> :
              (
                blogs.map(blog => (
                  <div className="col-12 col-lg-4 col-md-6" key={blog._id}>
                    <motion.div
                      className="box"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
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
                      <div>
                      <div className="card_saved">
                          <Link to={`/readblog/${blog._id}`}><img src={blog?.thumbnail} alt="Thumbnail" /></Link>
                          <div className="card_imageandtitle">
                            <div>
                              <Link to={`/usersprofile/${blog.user._id}`}>
                                <img src={blog?.user?.avatar ||  '/images/user-avatar.png'} alt="" />
                              </Link>
                            </div>
                            <div className="card_title">
                              <Link to={`/readblog/${blog._id}`}
                                style={{ textDecoration: 'none', color: 'white' }}
                              >
                                {trimTitle(blog.title)}
                              </Link>
                            </div>
                          </div>
                          <div className="card_time_user">
                            <Link to={`/usersprofile/${blog.user._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                              <div className="card_user">{blog?.user?.name}</div>
                            </Link>
                            <Link to={`/readblog/${blog._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                              <div className='card_time ' >
                                <div >{blog.views} views</div>
                                <div>
                                  <ReactTimeago date={blog.createdAt} />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))
              )
          }
        </div><br /><br /><br />
      </div>

    </div>
  )
}

export default Search