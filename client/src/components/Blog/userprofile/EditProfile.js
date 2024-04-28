import React from 'react';
import { Link } from 'react-router-dom';
import { FaHandPointRight } from "react-icons/fa";

const EditProfile = ({ userId }) => {
    return (
        <div className='editprofile'>
            <div className="changepasswordlink">
                <div><FaHandPointRight className='icon' /> <Link to={`/aboutuser/${userId}`}>About You</Link></div>
                <div><FaHandPointRight className='icon' /> <Link to={`/savedblogs/${userId}`}>Saved Posts</Link></div>
                <div><FaHandPointRight className='icon' /> <Link to={`/updateordelete/${userId}`}>Update or Delete Posts</Link></div>
                <div><FaHandPointRight className='icon' /> <Link to={`/receivedmsg/${userId}`}>Received Messages</Link></div>
                <br />
                <div><FaHandPointRight className='icon' /> <Link to='/changepassword'>Change Password ?</Link></div>
                <div><FaHandPointRight className='icon' /> <Link to={`/updateprofile/${userId}`}>Update Profile ?</Link></div>
                <div><FaHandPointRight className='icon' style={{ color: 'red' }} />
                    <Link
                        className='mx-1'
                        style={{ color: 'red' }}
                        to={`/confirmpassword/${userId}`}>Delete my Account.</Link></div>
            </div>
        </div>
    );
};

export default EditProfile;
