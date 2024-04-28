import React, { useState } from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Admindashboard = ({ children }) => {
  
  const [toggleDashboard, setToggleDashboard] = useState(false)
  const handleToggleDashboard = () => {
    setToggleDashboard(true)
  }
  
  return (
    <div>
      <div className="toggle-button"><GiHamburgerMenu onClick={handleToggleDashboard}/></div>
      <div className='admindashboard'>
        <div className={`admin-box ${toggleDashboard ? "admin-box" : "toggle-admin-box"}`}>
          <div className="admin-responsive">
            <div className="admin-user">
              <img src="/images/logo.png" alt="" />
              <div className="admin-name">Admin</div>
            </div>
            <div className="admin-link">
              <Link to='/admin/dashboard'><button>Dashboard</button></Link>
              <Link to='/admin/users'><button>Users</button></Link>
              <Link to='/admin/blogs'><button>Blogs</button></Link>
              <Link to='/admin/messages'><button>Messages</button></Link>
              <Link to='/admin/reports'><button>Reports</button></Link>
            </div>
          </div>
          <div className="toggleclosebutton">
            <FaArrowAltCircleLeft onClick={()=>setToggleDashboard(false)}/>
          </div>
        </div>
        <div className='admin-children mt-2'>
          {children}
        <br /><br /><br />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Admindashboard