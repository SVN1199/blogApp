import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, updateprofile } from '../../../action/userActions'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { clearUpdateProfile } from '../../../slices/authSlice'

const UpdateProfile = () => {

    const { user, isUpdated, error } = useSelector((state) => state.authState)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("/images/user-avatar.png")


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChangeAvatar = (e) => {
        if (e.target.name === 'avatar' && e.target.files.length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const onsubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('avatar', avatar);
        dispatch(updateprofile(formData))
    }

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }

        if (isUpdated) {
            toast('Profile Updated Successfully', {
                position: 'bottom-center',
                type: 'success',
                onOpen : () => dispatch(clearUpdateProfile())
            })
            navigate(`/usersprofile/${user._id}`)
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearAuthError)
            })
        }


    }, [user, isUpdated, error, dispatch, navigate])

    return (
        <div className='updateprofile'>
            <div className="updateprofilebody">
                <h5>Update Profile</h5><div className="lineh"></div><br />
                <form onSubmit={onsubmit}>
                    <img src={avatarPreview}
                        className='rounded-circle'
                        alt='Avatar Preview' />
                    <div>
                        <label>Avatar</label>
                        <input type="file" name='avatar' onChange={onChangeAvatar} />
                    </div>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name='name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile