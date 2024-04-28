import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ReactTimeago from 'react-timeago';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlog } from '../../../action/blogAction';
import { FaCircleArrowRight } from 'react-icons/fa6';
import Loading from '../../layouts/Loading';

const Home = () => {

  const { blogs = [], loading } = useSelector((state) => state.blogState)
  const { user } = useSelector((state) => state.authState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlog())
  }, [dispatch])

  const trimTitle = (title) => {
    return title.length > 50 ? `${title.substring(0, 50)}...` : title;
  };

  return (
    <div className='home'>
      {
        loading ? loading && <Loading /> :
          <div className="container">
            <div className="row">
              <div className="upperhome">
                <div className="upperhome-welcome">
                  Hi,  {user?.name || 'Guest'} <br />
                </div>
                <div className="warmwelcome">
                  Spark warmly welcomes you.
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="recentblog">
                Recent Blogs
                <Link to='/blogs' style={{ textDecoration: 'none', color: 'white' }}>
                  <div className="icon">< FaCircleArrowRight /></div>
                </Link>
                <div className="linehome"></div>
              </div>
              {
                blogs.length === 0 ? <div className='text-center mt-5'>
                  <b>
                    No Recent Blogs Found
                  </b>
                </div> :
                  (blogs && blogs.slice(0, 4).map(blog => (
                    <div className="col-12 col-lg-3 col-md-6 mt-3" key={blog._id}>
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
                        <Link to={`/readblog/${blog._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                          <div className="card_saved1">
                            <img src={blog.thumbnail} alt="" />
                            <div className="card_imageandtitle">
                              <div className="card_title">
                                {trimTitle(blog.title)}
                              </div>
                            </div>
                            <div className="card_time mt-1">
                              <ReactTimeago date={blog.createdAt} />
                            </div>
                          </div>
                        </Link>
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

export default Home