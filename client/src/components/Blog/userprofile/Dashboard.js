import React from 'react'
import { FaBlogger, FaComment, FaEye, FaHeart } from "react-icons/fa6";

const Dashboard = ({
  totalViews,
  totalLikes,
  totalComments,
  totalPosts
}) => {
  return (
    <div className='user_dashboard'>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="userdash1">
            <div>
              <span><FaBlogger className='icon' /></span><br />
              <span>{totalPosts} Posts</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="userdash1">
            <div>
              <span><FaEye className='icon' /></span><br />
              <span>{totalViews} Views</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="userdash1">
            <div>
              <span><FaHeart className='icon' /></span><br />
              <span>{totalLikes} Likes</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <div className="userdash1">
            <div>
              <span><FaComment /></span><br />
              <span>{totalComments} Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard