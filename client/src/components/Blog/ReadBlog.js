import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addLikes, deleteComments, getAllComments, getSingleBlog, postComments, unLikes } from '../../action/blogAction';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaRegBookmark, FaRegHeart, FaMapMarkerAlt, FaBookmark, FaTrash } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { toast } from 'react-toastify'
import { clearBlogError, clearReviewCreated, clearReviewDeleted } from '../../slices/blogSlice';
import { clearAuthError } from '../../action/userActions';
import { reportUsersToBlog, saveBlog, unsaveBlog, usersGet } from '../../action/usersAction';
import { IoLogoWhatsapp } from "react-icons/io";
import { MdReport } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { clearPostReportToBlog } from '../../slices/usersSlice';
import { format, parseISO } from 'date-fns'
import Loading from '../layouts/Loading';
import ReactTimeago from 'react-timeago';
import CommentLoader from '../layouts/CommentLoader';
import { LuLink2 } from "react-icons/lu";

const ReadBlog = () => {
  const { blog = {}, commentsLoading, loading: blogLoading, reviews = [], likes = [], isReviewCreated, isReviewDeleted, isBlogDeleted, error } = useSelector((state) => state.blogState)
  const { user = {}, error: AuthError, loading: authLoading } = useSelector((state) => state.authState)
  const { user: getUser = {}, saved = [], isReportSuccess, loading: usersLoading } = useSelector((state) => state.usersState)

  const dispatch = useDispatch()
  const { id: blogId } = useParams()

  const loading = blogLoading || usersLoading || authLoading

  const lengthOfUsers = likes.length
  const likeCount = Number(lengthOfUsers) || 0

  const isYou = user._id === blog?.user?._id

  const handleShare = (platform) => {
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
          `Check out this blog: ${window.location.href}`
        )}`;
        break;
      case 'whatsappmobile':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `Check out this blog: ${window.location.href}`
        )}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const [content, setContent] = useState('')
  const handleCommentSubmit = (e) => {
    e.preventDefault()
    dispatch(postComments(blogId, user._id, content))
    setContent('')
  }

  useEffect(() => {
    if (AuthError) {
      toast(AuthError, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => { dispatch(clearAuthError()) }
      })
    }
  }, [AuthError, dispatch])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard", { position: 'bottom-center', type: 'success' });
  }


  const isLiked = likes.includes(user._id);
  const isSaved = saved.includes(blogId)
  const isFollow = getUser?.following?.includes(blog?.user?._id);



  useEffect(() => {

    if (error) {
      toast(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => dispatch(clearBlogError())
      });
      return
    }

  }, [error, dispatch]);

  useEffect(() => {

    if (isBlogDeleted) {
      toast('Deleted Successfully', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => { dispatch(clearReviewCreated()) }
      })
      return
    }

    if (blogId) {
      dispatch(getSingleBlog(blogId))
      dispatch(usersGet())
    }
  }, [error, isBlogDeleted, blogId, dispatch])

  useEffect(() => {
    if (isReviewCreated) {
      toast('Comment has been successfully submitted.', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => { dispatch(clearReviewCreated()) }
      })
      return
    }

    if (isReviewDeleted) {
      toast('Comment successfully removed.', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => { dispatch(clearReviewDeleted()) }
      })
      return
    }

    dispatch(getAllComments(blogId))
  }, [isReviewCreated, isReviewDeleted, dispatch, blogId])

  useEffect(() => {
    if (isReportSuccess) {
      toast(`success`, {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => dispatch(clearPostReportToBlog())
      })
      return
    }
  }, [dispatch, isReportSuccess])


  const handledeleteComments = (blogId, userId, commentUser) => {
    dispatch(deleteComments(blogId, userId, commentUser))
  }


  const handleLikeButton = () => {
    dispatch(addLikes(blogId))
  }

  const handleUnLikeButton = () => {
    dispatch(unLikes(blogId))
  }

  const handlesave = () => {
    dispatch(saveBlog(blogId))
  }

  const handleUnsave = () => {
    dispatch(unsaveBlog(blogId))
  }

  const [report, setReport] = useState('')
  const [toggle, setToggle] = useState(false)


  const handleReportSubmit = (e) => {
    if (report !== '' && report.length > 3) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('reports', report);
      dispatch(reportUsersToBlog(blogId, formData));
      setReport('')
      setToggle(false)
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div className='read'>
      <div className="container-fluid read-inner">
        {
          blog &&
          <>
            <div className="row blogupperbox">
              <div className="col-12 col-lg-4 col-md-6 col-sm-12 ">
                <div className='readblogimage'>
                  <img className='rimgread' src={blog.thumbnail} alt="" />
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-6 col-sm-12 bloglowerbox">
                <div className="blogreadtitle">
                  {blog.title}
                </div>
                <div className='blogread-category'>{blog.category}</div>

                <div className="blogreaduserlike mt-1">
                  <li>
                    <SiSimpleanalytics className='icon' />
                    <div>{blog.views}</div>
                  </li>
                  <li>
                    {
                      isLiked ?
                        <FaHeart onClick={handleUnLikeButton} className='icon' />
                        :
                        <FaRegHeart onClick={handleLikeButton} className='icon' />
                    }
                    <div>{likeCount}</div>
                  </li>
                  <li>
                    {
                      isSaved ?
                        <FaBookmark onClick={handleUnsave} />
                        :
                        <FaRegBookmark onClick={handlesave} className={!getUser ? 'disable' : ''} />
                    }
                  </li>
                  <li><IoLogoWhatsapp className='icon' onClick={() => handleShare('whatsapp')} /></li>
                  <li ><LuLink2 className='icon' onClick={handleCopyLink} /></li>
                  <Link to='/blogs'><li><FaMapMarkerAlt className='icon' /></li></Link>
                  {
                    user?._id === blog?.user?._id ? '' :
                      <li>
                        <div className="userthreedoticon"><MdReport onClick={() => setToggle(true)} /></div>
                      </li>
                  }
                </div><br /><br /><br /><br />
                <Link to={`/usersprofile/${blog.user && blog.user._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className="blogreaduserimage">
                    <img src={(blog.user && blog.user.avatar) || '/images/user-avatar.png'} alt="" />
                    <div className="blogusername" >
                      {blog.user && blog.user.name}<br />
                      <span className='bloguserfollow'>{isYou ? 'You' : isFollow ? 'Following' : 'Follow'}</span>
                    </div>
                  </div>
                </Link>
                <div className="blogreadtime">
                  {blog.createdAt && format(parseISO(blog.createdAt), 'MMMM dd, yyyy - hh:mm:ss a')}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12" >
                <div className='readblogdesc' dangerouslySetInnerHTML={{ __html: blog.description }}>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      {
        toggle &&
        <div className="modal-userprofile">
          <div className="modalbody-userprofile">
            <div className='userreportbody'>
              <RxCross1 className='icon' onClick={() => setToggle(false)} />
              <label>Report</label>
              <textarea
                type="text"
                placeholder='Enter your words'
                name='reports'
                value={report}
                onChange={(e) => setReport(e.target.value)}
                maxLength={100}
                required
              />
              <div className="reportbodyletters">{report.length}/100 characters</div>
              <button type='submit' onClick={handleReportSubmit}>Submit</button>
            </div>
          </div>
        </div>
      }

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-12 col-md-12 col-sm-12 readblogcomments">
            <form onSubmit={handleCommentSubmit}>
              <label>Comments</label><br />
              <div className='readcommentsblog'>
                <input
                  type="text"
                  placeholder='Write Yourself...'
                  name='content'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button type='submit'><IoSend /></button>
              </div>
            </form>
            <hr />
            <div className="readbodycomments ">
              <div className="readcommentsread">
                {
                  commentsLoading ? <CommentLoader /> :
                    Array.isArray(reviews)
                    && reviews?.length > 0 && reviews?.map((com) => (
                      <div className="innereadcomments mt-2" key={com._id} >
                        {user?._id === com.user?._id && (
                          <div className="deletecomments">
                            <FaTrash onClick={() => handledeleteComments(blogId, user._id, com.user._id)} />
                          </div>
                        )}
                        <div className="imgreadcom">
                          <Link to={`/usersprofile/${com.user && com.user._id}`}><img src={com.user && com.user.avatar} alt="" /></Link>
                          <div className="readcommentshead">
                            <span>
                              {com.user && com.user.name}
                            </span>
                            <div className="innercommentswrite">
                              {com.user && com.content}
                            </div>
                            <div className="readcommentstime">
                              <ReactTimeago date={com.createdAt} />
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}

export default ReadBlog