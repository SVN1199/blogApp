import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteContact, getContacts } from '../../../action/usersAction';
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify'
import { clearContactDelete, clearUsersError } from '../../../slices/usersSlice';
import Loading from '../../layouts/Loading';
import { format, parseISO } from 'date-fns';

const ReceivedMsg = () => {

  const { id: userId } = useParams()
  const dispatch = useDispatch()

  const { contact = [], isDeleteContact, error , loading} = useSelector((state) => state.usersState)

  useEffect(() => {
    dispatch(getContacts(userId))
  }, [dispatch, userId])

  const [toggle, setToggle] = useState(false)
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const [contactInfo, setContactInfo] = useState(null)

  const handleDelete = () => {
    dispatch(deleteContact(userId, contactInfo))
    setToggle(false)
  }

  useEffect(() => {
    if (isDeleteContact) {
      toast('The message has been removed.', {
        position: 'bottom-center',
        type: 'success',
        onOpen: () => dispatch(clearContactDelete())
      })
    }

    if (error) {
      toast(error, {
        position: 'bottom-center',
        type: 'error',
        onOpen: () => { dispatch(clearUsersError()) }
      })
    }
  }, [isDeleteContact, dispatch, error])

  if(loading){
    return <Loading/>
  }

  return (
    <div className='rcdmsg'>
      <div className="container">
        <br /><br /><br />
        <div className="row">
          <div className="col-md-12">
            {
              contact?.length === 0 ?
                <div className='usermsg'>You have no messages.</div>
                :
                (contact?.map(post => (
                  <div className="rsgbox" key={post._id}>
                    <div className="into"
                      onClick={() => {
                        handleToggle(true)
                        setContactInfo(post?.userId?._id)
                      }}
                    >
                      <RxCross1 />
                    </div>
                    <div className="rsguserimage">
                      <Link to={`/usersprofile/${post?.userId?._id}`}>
                        <img src={post?.userId?.avatar} alt="" />
                      </Link>
                    </div>
                    <div className="regcontent">
                      <div className="rsginner">
                        <li className='nameuser'>{post?.userId?.name}</li>
                        <li className='usertime'>{post?.createdAt && format(parseISO(post?.createdAt), 'MMMM dd, yyyy - hh:mm:ss a')}</li>
                      </div>
                      <p>
                        {post?.contactInfo}
                      </p>
                    </div>
                  </div>
                )))
            }
          </div>
        </div>
      </div>
      {
        toggle &&
        <div className="boxmodal">
          <p>Are You Sure to Remove ?</p>
          <div>
            <li><button onClick={handleToggle}>Cancel</button></li>
            <li><button onClick={handleDelete}>Ok</button></li>
          </div>
        </div>
      }
    </div>
  )
}

export default ReceivedMsg