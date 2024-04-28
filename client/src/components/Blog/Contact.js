import React, { useEffect, useState } from 'react'
import Footer from '../layouts/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearUsersError, contactUserToAdminClear } from '../../slices/usersSlice'
import { postContactUser } from '../../action/usersAction'
import { useNavigate } from 'react-router-dom'

const Contact = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isContactedAdmin, error } = useSelector((state) => state.usersState)

    useEffect(() => {
        if (isContactedAdmin) {
            toast('Message Sent Successfully', {
                position: 'bottom-center',
                type: 'success',
                autoClose: 3000,
                onOpen: () => dispatch(contactUserToAdminClear())
            })
            navigate('/home')
            return
        }

        if (error) {
            toast(error, {
                position: 'bottom-center',
                type: 'error',
                onOpen: () => dispatch(clearUsersError())
            })
            return
        }

    }, [isContactedAdmin, error, dispatch, navigate])

    const [queries, setQueries] = useState('')

    const handleQueries = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('queries', queries)
        dispatch(postContactUser(formData))
        setQueries('')
    }

    return (
        <div className='contact'>
            <div className="contact-inner">
                <div className="contact-admin-heading">Contact <hr /></div>
                <form onSubmit={handleQueries}>
                    <label>If you have any queries, reports, or require any information, please contact us.</label>
                    <textarea
                        name="queries"
                        value={queries}
                        onChange={(e) => setQueries(e.target.value)}
                        maxLength={500}
                    ></textarea>
                    <div className="countqueries">{queries.length} / 500 letters</div>
                    <button>Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Contact