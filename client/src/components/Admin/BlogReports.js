import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlogReportByAdmin, getReportBlog } from '../../action/adminAction';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { clearAdminError, clearBlogReportDeleted } from '../../slices/adminSlice';

const BlogReports = () => {

    const dispatch = useDispatch();
    const { reportsBlog = [], error, isBlogReportDeleted } = useSelector((state) => state.adminState);
    const { id: blogId } = useParams();


    useEffect(() => {

        if (isBlogReportDeleted) {
            toast('Removed', {
                position : 'top-center',
                type: 'success',
                onOpen: () => dispatch(clearBlogReportDeleted())
            })
        }

        if (error) {
            toast(error, {
                position : 'top-center',
                type: 'error',
                onOpen: () => dispatch(clearAdminError())
            })
        }

        dispatch(getReportBlog(blogId))
    }, [dispatch, blogId, isBlogReportDeleted, error])


    const [toggle, setToggle] = useState(false)

    const [blogReportId, setBlogReportId] = useState(null)

    const handleToggle = (blogId) => {
        setToggle(true)
        setBlogReportId(blogId)
    }

    const handleDelete = () => {
        const formData = new FormData()
        formData.append('reportId', blogReportId)
        dispatch(deleteBlogReportByAdmin(blogId, formData))
        setToggle(false)
        setBlogReportId('')
    }


    return (
        <div className='blogreportsbox'>
            <div className="container">
                <div className="row">
                    <h5 className='mt-2 heading-topics-admin'>Reports - Blog ({reportsBlog?._id}) <div className="admin-line"></div></h5>
                    {
                        reportsBlog?.reportsBlog?.length === 0 ?
                            <div className='noreports'>No Reports</div> :
                            (reportsBlog && reportsBlog.reportsBlog && reportsBlog?.reportsBlog?.map(report => (
                                <div className="col-md-4" key={report._id}>
                                    <div className="report-blog">
                                        <div className="report-icon">
                                            <RxCross2
                                                onClick={() => handleToggle(report._id)}
                                            />
                                        </div>
                                        <div className="blog-id"><b>Reporter Id</b> : {report?.userId} </div>
                                        <div className="blog-id-report">
                                            <b>Report Info </b> :
                                            <span className='mx-1'> {report?.reportBlogInfo}</span>
                                        </div>
                                        <div className="report-time"><b>At</b>  : {report?.createdAt}</div>
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
    );
}

export default BlogReports