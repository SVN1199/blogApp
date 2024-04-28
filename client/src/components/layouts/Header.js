import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaBlogger, FaHome, FaPlusSquare, FaSave, FaSearch, FaUser, FaUserFriends, FaUsers, FaUsersCog } from "react-icons/fa";
import { FaBlog, FaFireFlameCurved, FaMessage } from 'react-icons/fa6';
import { MdSubscriptions } from "react-icons/md";

const Header = () => {

  const { isAuthenticated, user = {} } = useSelector((state) => state.authState)

  const {id} = useParams()

  const location = useLocation()

  return (
    <div className='header'>
      <div className='headerlinkname'>

        {location.pathname === '/home' &&
          <>
            <FaHome className='homeicon' />
            <div>Home</div>
          </>
        }
        {location.pathname === '/blogs' &&
          <>
            <FaBlog className='homeicon' />
            <div>Blogs</div>
          </>
        }
        {location.pathname === '/trending' &&
          <>
            <FaFireFlameCurved className='homeicon' />
            <div>Trending</div>
          </>
        }
        {location.pathname === '/createblogs' &&
          <>
            <FaPlusSquare className='homeicon' />
            <div>Create</div>
          </>
        }
        {location.pathname === '/search' &&
          <>
            <FaSearch className='homeicon' />
            <div>Search</div>
          </>
        }
        {location.pathname === '/followingfeeds' &&
          <>
            <MdSubscriptions className='homeicon' />
            <div>Subscriptions</div>
          </>
        }
        {location.pathname === '/blogs/users' &&
          <>
            <FaUsers className='homeicon' />
            <div>Users</div>
          </>
        }
        {location.pathname === `/usersblogs/${id}` &&
          <>
            <FaUsersCog className='homeicon' />
            <div>User Blogs</div>
          </>
        }
        {location.pathname === `/usersprofile/${id}` &&
          <>
            <FaUser className='homeicon' />
            <div>User Profile</div>
          </>
        }
        {location.pathname === `/savedblogs/${id}` &&
          <>
            <FaSave className='homeicon' />
            <div>Saved Blogs</div>
          </>
        }
        {location.pathname === `/receivedmsg/${id}` &&
          <>
            <FaMessage className='homeicon' />
            <div>User Messages</div>
          </>
        }
        {location.pathname === `/userfollow/${id}` &&
          <>
            <FaUserFriends className='homeicon' />
            <div>User Follow</div>
          </>
        }
        {location.pathname === `/updateordelete/${id}` &&
          <>
            <FaBlogger className='homeicon' />
            <div>User Posts</div>
          </>
        }
      </div>
      <div className="col-md-12">
        <div className="header-body">
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div className="logo-blog"><img src='/images/logo.png' alt='Logo'/></div>
          </Link>

          <div className="userprofile-header">
            {
              isAuthenticated ?
                <>
                  {
                    user &&
                    <Link to={`/usersprofile/${user._id}`} style={{ textDecoration: 'none', color: "none" }}>
                      <img src={user.avatar || '/images/user-avatar.png'} alt="user profile" />
                    </Link>
                  }
                </>
                :
                <img src="/images/user-avatar.png" alt="" />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
