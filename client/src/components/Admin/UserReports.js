import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteUserReportByAdmin, getReportUser } from '../../action/adminAction';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { clearAdminError, clearUserReportDeleted } from '../../slices/adminSlice';
import { format, parseISO } from 'date-fns';
import Loader from '../layouts/Loader';
const UserReports = () => {

    const dispatch = useDispatch();
    const { reportsUser = [], isUserReportDeleted, error, loading } = useSelector((state) => state.adminState);
    const { id: userId } = useParams();


    useEffect(() => {

        if (isUserReportDeleted) {
            toast('Removed', {
                position: 'top-center',
                type: 'success',
                onOpen: () => dispatch(clearUserReportDeleted())
            })
        }

        if (error) {
            toast(error, {
                position : 'top-center',
                type: 'error',
                onOpen: () => dispatch(clearAdminError())
            })
        }

        dispatch(getReportUser(userId))
    }, [dispatch, userId, error, isUserReportDeleted])

    const [toggle, setToggle] = useState(false)

    const [userReportId, setUserReportId] = useState(null)

    const handleToggle = (userId) => {
        setToggle(true)
        setUserReportId(userId)
    }

    const handleDelete = () => {
        const formData = new FormData()
        formData.append('reportId', userReportId)
        dispatch(deleteUserReportByAdmin(userId, formData))
        setToggle(false)
        setUserReportId('')
    }


    if (loading) {
        return <Loader />
    }

    return (
        <div className='blogreportsbox'>
            <div className="container">
                <div className="row">
                    <h5 className='mt-2 heading-topics-admin'>Reports - User ({reportsUser?._id}) <div className="admin-line"></div></h5>
                    {
                        reportsUser && reportsUser.reportsUser && reportsUser.reportsUser.length === 0 ?
                            <div className='noreports'>No Reports</div> :
                            (reportsUser && reportsUser?.reportsUser && reportsUser?.reportsUser?.map(report => (
                                <div className="col-md-4" key={report._id}>
                                    <div className="report-blog">
                                        <div className="report-icon">
                                            <RxCross2 onClick={() => handleToggle(report._id)} />
                                        </div>
                                        <div className="blog-id"><b>Reporter Id</b> : {report?.userId} </div>
                                        <div className="blog-id-report">
                                            <b>Report Info</b> :
                                            <span className='mx-1'> {report?.reportUserInfo}
                                            </span>
                                        </div>
                                        <div className="report-time"><b>At</b>  : <span className='mx-1'></span>
                                            {report?.createdAt && format(parseISO(report?.createdAt), 'MMMM dd, yyyy - hh:mm:ss a')}
                                        </div>
                                    </div>
                                </div>
                            )))
                    }
                </div>
            </div>

            {
                toggle &&
                <div className="modal-reports-blog">
                    <b className='text-center text-white'>Are Your Sure to remove ?</b>
                    <div>
                        <button onClick={() => setToggle(false)}>Cancel</button>
                        <button onClick={handleDelete}>Ok</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserReports