import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createContact } from '../../../action/usersAction'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearContactCreate, clearUsersError } from '../../../slices/usersSlice';

const Contact = () => {

  const { id: userId } = useParams()

  const [contactInfo, setContactInfo] = useState('')
  const dispatch = useDispatch()

  const { isCreatedContact, error } = useSelector((state) => state.usersState)

  const countCharacters = (text) => {
    const strippedText = text.replace(/(<([^>]+)>)/gi, "");
    return strippedText.length;
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('contactInfo', contactInfo)
    dispatch(createContact(userId, formData))
  }

  useEffect(() => {

    if (isCreatedContact) {
      toast('ContactInfo Submitted', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => { dispatch(clearContactCreate()) }
      })
      return
    }

    if (error) {
      toast(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => { dispatch(clearUsersError()) }
      })
      return
    }

  }, [dispatch, isCreatedContact, error])

  return (
    <div className='usercontact'>
      <form onSubmit={submitHandler}>
        <label>If Any Queries Contact me...</label><br />
        <textarea
          name="contactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          maxLength={200}
          minLength={80}
        />
        <div>{countCharacters(contactInfo)} / 200 characters</div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Contact