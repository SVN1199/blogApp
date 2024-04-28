import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingBlog } from '../../../action/blogAction';
import { Link } from 'react-router-dom';
import Loading from '../../layouts/Loading';
import ReactTimeago from 'react-timeago';

const Trending = () => {
  const { trending = [], loading } = useSelector((state) => state.blogState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrendingBlog());
  }, [dispatch]);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const trimTitle = (title) => {
    return title.length > 60 ? `${title.substring(0, 60)}...` : title;
  };

  return (
    <div className='trending'>
      {
        loading ? <Loading /> :
          <motion.div variants={container} initial="hidden" animate="visible">
            <div className="container"><br /><br /><br />
              <div className="row">
                {
                  trending.length === 0 ?
                    <div className='no-blog-found'>No Blogs Found</div>
                    :
                    (trending && trending.map((blog, index) => (
                      <motion.div
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
                        className="box col-lg-4 col-md-6 col-sm-12 col-xs-12" key={index} variants={item}
                      >
                        <div className="card_saved">
                          <Link to={`/readblog/${blog._id}`}><img src={blog?.thumbnail} alt="Thumbnail" /></Link>
                          <div className="card_imageandtitle">
                            <div>
                              <Link to={`/usersprofile/${blog.user._id}`}>
                                <img src={blog?.user?.avatar || '/images/user-avatar.png'} alt="" />
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
                    )))
                }
              </div><br /><br /><br />
            </div>
          </motion.div>
      }
    </div>
  );
};

export default Trending;
