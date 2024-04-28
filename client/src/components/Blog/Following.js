import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowingBlog } from '../../action/blogAction'
import ReactTimeago from 'react-timeago';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Loading from '../layouts/Loading';

const Following = () => {

  const { followingBlogs: blogs = [], loading } = useSelector((state) => state.blogState)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFollowingBlog())
  }, [dispatch])

  const trimTitle = (title) => {
    return title.length > 60 ? `${title.substring(0, 60)}...` : title;
  };

  return (
    <div className='following'>
      {
        loading ? loading && <Loading /> :
          <div className="container"><br /><br /><br />
            <div className="row">
              {
                blogs.length === 0 ?
                  <div className='no-blog-found'>
                    You haven't followed anyone yet.
                  </div> :
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
      }
    </div>
  )
}

export default Following