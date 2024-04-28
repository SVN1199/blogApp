import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getSaveBlogByUser } from '../../../action/usersAction'
import { motion } from 'framer-motion';
import Loading from '../../layouts/Loading';
import ReactTimeago from 'react-timeago';

const SavedBlog = () => {

  const { savedBlog: blog = [], loading } = useSelector((state) => state.usersState)

  const dispatch = useDispatch()

  const { id: userId } = useParams()

  useEffect(() => {

    if (userId) {
      dispatch(getSaveBlogByUser(userId))
    }

  }, [dispatch, userId])

  const trimTitle = (title) => {
    return title.length > 60 ? `${title.substring(0, 60)}...` : title;
  };

  return (
    <div className='savedblogs'>
      {
        loading ? loading && <Loading /> :
          <div className="container">
            <div className="row"><br />
              <div className='saveheadings'>Saved Blogs <hr /></div>
              {
                blog.length === 0 ? <div className='savednoblogs'>You haven't saved any blogs yet</div> :
                  (blog && blog.map(blog => (
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={blog._id}>
                      <motion.div
                        className="box"
                        initial={{ opacity: 0, scale: 0.5 }}
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
                        <div className="card_saved">
                          <Link to={`/readblog/${blog._id}`}><img src={blog?.thumbnail} alt="Thumbnail" /></Link>
                          <div className="card_imageandtitle">
                            <div>
                              <Link to={`/usersprofile/${blog.user._id}`}>
                                <img src={blog?.user?.avatar} alt="" />
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
                      </motion.div>
                    </div>
                  )))
              }
            </div><br /><br />
          </div>
      }
    </div>
  )
}

export default SavedBlog