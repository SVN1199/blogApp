import { FaBlog, FaFire, FaHome, FaSearch, FaUsers } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { MdSubscriptions } from "react-icons/md";
import { FaCirclePlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RiAdminFill } from "react-icons/ri";

const Footer = () => {
    const { isAuthenticated, user } = useSelector((state) => state.authState)

    const location = useLocation()


    return (
        <div className="footer shadow-lg">
            <div className='footer_nav'>
                <li><Link to='/home' className={location.pathname === '/home' ? 'undernav' : ""}><FaHome /></Link></li>
                <li><Link to='/blogs' className={location.pathname === '/blogs' ? 'undernav' : ""}><FaBlog /></Link></li>
                <li><Link to='/trending' className={location.pathname === '/trending' ? 'undernav' : ""}><FaFire /></Link></li>
                {
                    isAuthenticated &&
                    <li><Link to='/createblogs' className={location.pathname === '/createblogs' ? 'undernav' : ""}><FaCirclePlus /></Link></li>
                }
                <li><Link to='/search' className={location.pathname === '/search' ? 'undernav' : ""}><FaSearch /></Link></li>
                {
                    isAuthenticated &&
                    <li><Link to='/followingfeeds' className={location.pathname === '/followingfeeds' ? 'undernav' : ""}><MdSubscriptions /></Link></li>
                }
                {
                    isAuthenticated &&
                    <li><Link to='/blogs/users' className={location.pathname === '/blogs/users' ? 'undernav' : ""}><FaUsers /></Link></li>
                }
                {
                    isAuthenticated &&
                    user?.role === 'admin' &&
                    <li><Link to='/admin' className={location.pathname === '/admin' ? 'undernav' : ""}><RiAdminFill /></Link></li>
                }
            </div>
        </div>
    )
}

export default Footer