import React, { useEffect, useState } from 'react'
import Contact from './userprofile/Contact'
import Dashboard from './userprofile/Dashboard'
import About from './userprofile/About'
import ShowUserPosts from './userprofile/ShowUserPosts'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { countPost, followUser, getAbout, getFollowersAndFollowing, getPostByUser, getSaveBlogByUser, reportUsersToUser, unfollowUser, userByParams } from '../../action/usersAction'
import EditProfile from './userprofile/EditProfile'
import { toast } from 'react-toastify'
import { clearPostReportToUser, clearUsersError } from '../../slices/usersSlice'
import { MdReport } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Loading from '../layouts/Loading'

const UserProfile = () => {

    const { isAuthenticated, user = {}, loading: authLoading } = useSelector((state) => state.authState)

    const { id: userId } = useParams()
    const dispatch = useDispatch()

    const {
        singleUser = {},
        totalViews,
        totalLikes,
        totalComments,
        totalPosts,
        userposts = [],
        aboutUser = {},
        followers = [], following = [], error, isReportSuccess,
        loading: usersLoading
    } = useSelector((state) => state.usersState)

    const loading = usersLoading || authLoading

    const isSame = Boolean(userId === user._id)

    const followerLength = followers.length
    const followersCount = Number(followerLength) || 0

    const followingLength = following.length
    const followingCount = Number(followingLength) || 0

    const follow = followers.includes(user._id)

    const isVisible = Boolean(user._id === userId)

    useEffect(() => {

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearUsersError())
            })
            return
        }


        if (userId) {
            dispatch(userByParams(userId))
            dispatch(countPost(userId))
            dispatch(getPostByUser(userId))
            dispatch(getSaveBlogByUser(userId))
            dispatch(getAbout(userId))
            dispatch(getFollowersAndFollowing(userId))
        }

    }, [dispatch, userId, error])

    const [showDashboard, setShowDashboard] = useState(true)
    const [showPosts, setShowPosts] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)


    const handleUserDashNav = () => {
        setShowEditProfile(false)
        setShowDashboard(true)
        setShowPosts(false)
        setShowAbout(false)
        setShowContact(false)
    }

    const handleUserPostsNav = () => {
        setShowEditProfile(false)
        setShowDashboard(false)
        setShowPosts(true)
        setShowAbout(false)
        setShowContact(false)
    }

    const handleUserAboutNav = () => {
        setShowEditProfile(false)
        setShowDashboard(false)
        setShowPosts(false)
        setShowAbout(true)
        setShowContact(false)
    }

    const handleUserContact = () => {
        setShowEditProfile(false)
        setShowDashboard(false)
        setShowPosts(false)
        setShowAbout(false)
        setShowContact(true)
    }

    const handleEditProfile = () => {
        setShowEditProfile(true)
        setShowDashboard(false)
        setShowPosts(false)
        setShowAbout(false)
        setShowContact(false)
    }


    const handleFollow = () => {
        dispatch(followUser(userId))
    }

    const handleUnFollow = () => {
        dispatch(unfollowUser(userId))
    }

    const [report, setReport] = useState('')

    const shareViaWhatsApp = () => {
        const url = window.location.href;
        const decodedUrl = decodeURIComponent(url);
        const message = encodeURIComponent('Check out this profile: ' + decodedUrl);

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            window.open(`whatsapp://send?text=${message}`, '_blank');
        } else {
            window.open(`https://web.whatsapp.com/send?text=${message}`, '_blank');
        }
    };

    const [toggle, setToggle] = useState(false)

    const handleReportSubmit = (e) => {
        e.preventDefault();
        if (report !== '') {
            const formData = new FormData();
            formData.append('reports', report);
            dispatch(reportUsersToUser(userId, formData));
            setReport('')
            setToggle(false)
        }
    };

    useEffect(() => {
        if (isReportSuccess) {
            toast(`success`, {
                position: 'bottom-center',
                type: 'success',
                onOpen: () => dispatch(clearPostReportToUser())
            })
            return
        }
    }, [dispatch, isReportSuccess])

    if (loading) {
        return <Loading/>
    }

    return (
        <div className='userprofile'>
            <div className="container">
                <br /><br /><br />
                <div className="row">
                    <div className="col-md-12 col-sm-12 mt-2">
                        {
                            singleUser && <div className={`userprofile_body ${singleUser.isActive ? "userbodyview" : "userbodynotview"}`}>
                                <div className="userprofileimg">
                                    {
                                        user?._id === singleUser?._id ? "" :
                                            <div className="userthreedot"><MdReport onClick={() => setToggle(true)} /></div>

                                    }
                                    <div className="userprofile_img">
                                        <img src={singleUser.avatar || '/images/user-avatar.png'} alt="Avatar" />
                                    </div>
                                    <div className="user_information">
                                        <div>
                                            <div className="user_name_profile">
                                                {singleUser.name}
                                            </div>
                                            {
                                                singleUser.isActive ?
                                                    <>
                                                        <div className='likesandviews'>
                                                            <li>
                                                                {
                                                                    <Link to={`/userfollow/${singleUser._id}`} style={{ textDecoration: 'none' }}>
                                                                        <div>Followers</div>
                                                                        <div className='text-center'>{followersCount}</div>
                                                                    </Link>
                                                                }
                                                            </li>
                                                            <li>
                                                                {
                                                                    <Link to={`/userfollow/${singleUser._id}`} style={{ textDecoration: 'none' }}>
                                                                        <div>Following</div>
                                                                        <div className='text-center'>{followingCount}</div>
                                                                    </Link>
                                                                }
                                                            </li>
                                                        </div>
                                                        <div className='userprofilebutton'>
                                                            {
                                                                !isSame &&
                                                                <div className="subscribe">
                                                                    {
                                                                        follow ?
                                                                            <button onClick={handleUnFollow}>
                                                                                Following
                                                                            </button>
                                                                            :
                                                                            <button onClick={handleFollow}>
                                                                                Follow
                                                                            </button>
                                                                    }
                                                                </div>
                                                            }
                                                            <div className="subscribe">
                                                                <button onClick={shareViaWhatsApp}>
                                                                    Share
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                    : <div className='suspended'>
                                                        Your Account has been suspended... <br />
                                                        Please Contact <Link to='/contact'>Admin</Link>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>

                                {
                                    singleUser.isActive ?
                                        <>
                                            <div className="userprofile_nav">
                                                <li onClick={handleUserDashNav}>Dashboard <div className={`${showDashboard ? 'contactline' : ''}`}></div></li>
                                                <li onClick={handleUserPostsNav}>Posts<div className={`${showPosts ? 'contactline' : ''}`}></div></li>
                                                <li onClick={handleUserAboutNav} >About <div className={`${showAbout ? 'contactline' : ''}`}></div></li>
                                                <li onClick={handleUserContact} >Contact <div className={`${showContact ? 'contactline' : ''}`}></div></li>
                                                {
                                                    isAuthenticated
                                                    &&
                                                    isVisible
                                                    &&
                                                    <li onClick={handleEditProfile} >Your's<div className={`${showEditProfile ? 'contactline' : ''}`}></div></li>
                                                }
                                            </div>
                                            <hr />
                                            <div className='underuserprofile'>
                                                {
                                                    showDashboard
                                                    &&
                                                    <Dashboard
                                                        totalViews={totalViews}
                                                        totalLikes={totalLikes}
                                                        totalComments={totalComments}
                                                        totalPosts={totalPosts}
                                                    />
                                                }
                                                {showPosts &&
                                                    <ShowUserPosts
                                                        user={userposts}
                                                    />
                                                }
                                                {showAbout && <About userId={userId} about={aboutUser} />}
                                                {showContact && <Contact />}
                                                {showEditProfile && <EditProfile userId={userId} about={aboutUser} />}
                                            </div>
                                        </> :
                                        <div className='blockimage'>
                                            <img src="/images/block.jpg" alt="" />
                                        </div>
                                }
                            </div>
                        }
                    </div>
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
                                <button onClick={handleReportSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <br /><br /><br />
        </div>
    )
}

export default UserProfile