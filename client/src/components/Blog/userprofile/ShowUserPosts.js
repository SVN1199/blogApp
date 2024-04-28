import { format, parseISO } from 'date-fns';
import React from 'react'
import { Link } from 'react-router-dom'

const ShowUserPosts = ({ user }) => {

  const trimTitle = (title) => {
    return title.length > 50 ? `${title.substring(0, 50)}...` : title;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {
          user?.length === 0 ? <div className='text-center mt-3'>
            <b>
              You haven't posted your blog yet.
            </b>
          </div> :
            (user && user.map(post => (
              <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12" key={post._id}>
                <div className="card_saved">
                  <Link to={`/readblog/${post._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <img src={post.thumbnail} alt="" />
                  </Link>
                  <div className="card_imageandtitle">
                    <Link to={`/usersprofile/${post.user._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                      <img src={(post.user && post.user.avatar) || '/images/user-avatar.png'} alt="user-avatar" />
                    </Link>
                    <div className="card_title" style={{ textDecoration: 'none', color: 'white' }}>
                      {trimTitle(post.title)}
                    </div>
                  </div>
                  <div className="card_time_user">
                    <Link to={`/usersprofile/${post.user._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                      <div className="card_user">{post.user && post.user.name}</div>
                    </Link>
                    <div className="card_time">{post.createdAt && format(parseISO(post.createdAt), 'MMMM dd, yyyy - hh:mm:ss a')}</div>
                  </div>
                </div>
              </div>
            )))
        }
      </div>
    </div>
  )
}

export default ShowUserPosts