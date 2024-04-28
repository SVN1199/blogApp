import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAbout, getAbout } from '../../../action/usersAction';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAboutCreated, clearUsersError } from '../../../slices/usersSlice';

const AboutForm = () => {
    const { id: userId } = useParams()
    const { aboutUser = {}, isAboutcreated, error } = useSelector((state) => state.usersState)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [tagline, setTagline] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    useEffect(() => {
        if (aboutUser) {
            setTagline(aboutUser.tagline || '');
            setAboutMe(aboutUser.aboutme || '');
        }
    }, [aboutUser])

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            tagline: tagline,
            aboutme: aboutMe
        };

        dispatch(createAbout(userId, formData));
        dispatch(getAbout(userId));

        setTagline('');
        setAboutMe('');
    };

    const countWords = (text) => {
        if (typeof text === 'string') {
            const textWithoutSpaces = text.replace(/\s/g, '');
            const letterCount = textWithoutSpaces.length;
            return letterCount;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        if (isAboutcreated) {
            toast('Updated Successfully', {
                position: 'top-center',
                type: 'success',
                onOpen: () => { dispatch(clearAboutCreated()) }
            })
            navigate(`/usersprofile/${userId}`)
            return
        }

        if (error) {
            toast(error, {
                position: 'top-center',
                type: 'success',
                onOpen: () => { dispatch(clearUsersError()) }
            })
            return
        }
    }, [isAboutcreated, dispatch, navigate, userId, error])

    return (
        <div className='aboutprofile'>
            <form onSubmit={onSubmit}>
                <h5>About Me <div className="lineh"></div></h5>
                <div>
                    <label htmlFor="tagline">Tagline</label><br />
                    <input
                        type="text"
                        id="tagline"
                        name="tagline"
                        placeholder='Enter your tagline'
                        maxLength={40}
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                    />
                    <div className="aboutwords">{countWords(tagline)} / 40 letter</div>
                </div>
                <div>
                    <label htmlFor="aboutYou">About You</label><br />
                    <textarea
                        id="aboutYou"
                        name="aboutme"
                        maxLength={250}
                        placeholder='Write a brief introduction about yourself'
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                    />
                    <div className="aboutwords">{countWords(aboutMe)} / 250 letter</div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default AboutForm
