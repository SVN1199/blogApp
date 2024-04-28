import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Followers from './followersAndFollowing/Followers';
import Following from './followersAndFollowing/Following';
import { getUserFollowersAndFollowing, userByParams, usersGet } from '../../../action/usersAction';

const UserFollow = () => {
    const [selectedTab, setSelectedTab] = useState('followers');
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user = {}, singleUser = {}, getFollowers, getFollowing } = useSelector((state) => state.usersState);

    const isFollowing = singleUser?.following?.includes(user?._id)
    const isFollower = singleUser?.followers?.includes(user?._id)

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };


    useEffect(() => {
        dispatch(getUserFollowersAndFollowing(id));
        dispatch(usersGet())
        dispatch(userByParams(id))
    }, [dispatch, id]);


    return (
        <div className='userfollow'>
            <div className="container">
                <br /><br />
                <div className="row">
                    <div className="col-lg-3 col-md-1"></div>
                    <div className="col-lg-6 col-md-10 col-sm-12">
                        <div className="boxfollow">
                            <div className='box-inner'>
                                <div className={`box ${selectedTab === 'followers' ? 'viewbox' : ''}`}>
                                    <li onClick={() => handleTabChange('followers')}>Followers</li>
                                </div>
                                <div className={`box ${selectedTab === 'following' ? 'viewbox' : ''}`}>
                                    <li onClick={() => handleTabChange('following')}>Following</li>
                                </div>
                            </div>
                            <div className="box-body">
                                {selectedTab === 'followers' &&
                                    <Followers
                                        user={user}
                                        isFollow={isFollower}
                                        followers={getFollowers}
                                    />}
                                {selectedTab === 'following' &&
                                    <Following
                                        user={user}
                                        isFollow={isFollowing}
                                        following={getFollowing} />}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    );
};

export default UserFollow;