import React from 'react'
import { Link } from 'react-router-dom'

const Followers = ({ followers, user, isFollow }) => {
    return (
        <div className='followers'>
            {
                followers?.length === 0 ?
                    <div className='followyet'>
                        No followers found
                    </div> :
                    (followers && followers.map(follow => (
                        <>
                            <div key={follow._id}>
                                <li className='avatarfollow'>
                                    <img src={follow.avatar || '/images/user-avatar.png'} alt="Avatar" />
                                    <div className='mt-3'>
                                        {follow.name}
                                    </div>
                                </li>
                                <li className='mt-3'>
                                    <Link to={`/usersprofile/${follow._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <button>
                                            View Page
                                        </button>
                                    </Link>
                                </li>
                            </div>
                            <hr />
                        </>
                    )))
            }
        </div>
    )
}

export default Followers