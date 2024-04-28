import { useState } from "react";

const Blogreports = ({ blogs }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const copyBlogId = (id) => {
    navigator.clipboard.writeText(id)
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Failed to copy blog ID: ', error);
      });
  };


  return (
    <div className='blogreportsbox' >
      {
        blogs.length === 0 ?
          <div className="noreportfound mt-5">
            No Reports Found
          </div>
          :
          (
            blogs.map(blog => (
              <div className="col-lg-3 col-md-4 col-sm-12" key={blog._id}>
                <div className="report-blog-box">
                  <img src={blog.thumbnail} alt="" />
                  <div className="report-blog-category"><b>Category : {blog.category}</b></div>
                  <div className="report-blog-title">
                    <b>Title :</b> {blog.title} 
                  </div>
                  <div className="blog-report-user">
                    <button onClick={() => copyBlogId(blog._id)}>Copy Blog Id</button>
                  </div>
                </div>
              </div>
            ))
          )
      }

      {
        isModalOpen &&
        <div className="modal-reports-blog">
          <b className='text-center text-white'> <p>Blog ID copied to clipboard!</p></b>
          <div>
            <button onClick={() => setIsModalOpen(false)} style={{ width: '100%' }}>Ok</button>
          </div>
        </div>
      }

    </div>
  )
}

export default Blogreports