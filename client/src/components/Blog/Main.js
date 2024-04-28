import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../action/userActions'
import { motion } from 'framer-motion'

const Main = () => {

  const { isAuthenticated } = useSelector((state) => state.authState)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logOut)
  }

  return (

    <>
      <div className='main'>
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div >
        <div className="main_nav">
          <div className="blog_logo_spark">
            <img src="/images/logo.png" alt="" />
          </div>

          <div className="blog_auth_nav">
            {
              isAuthenticated ?
                <div>
                  <li className='signup' onClick={handleLogout}>Logout</li>
                </div>
                : <>
                  <li className='loginbutton'><Link to='/login'>Login</Link></li>
                  <li className='signup'><Link to='/register'>Sign Up</Link></li>
                </>
            }
          </div>
        </div>
        <br />
        <div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 20
            }}
          >
            <div className="blog_nav_li">
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='blogs'>Blogs</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </div>
            <div className="blog_quotes">
              <h3>Welcome To Spark</h3><br />
              <q>
                Write from the heart. Rewrite from the head.
              </q>
            </div>
          </motion.div>
          <div className="blog_create_button">
            <Link to='/createblogs'>
              Let Ignite It
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
