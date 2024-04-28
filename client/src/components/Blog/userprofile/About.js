import React from 'react'
import { Link } from 'react-router-dom'

const About = ({ about, userId }) => {

  return (

    <div className='userprofile_about'>
      <div>
        <div className="userprofile_aboutheading">
          {about.tagline ||
            <div className='mx-5'>
              <Link to={`/aboutuser/${userId}`}>
                About Youself
              </Link>
            </div>
          }
        </div>
        <div className="userprofile_aboutpara">
          {about.aboutme}
        </div>
      </div>
    </div>
  )
}

export default About