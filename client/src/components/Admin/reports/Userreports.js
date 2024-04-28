import React, { useState } from 'react'

const Userreports = ({ users }) => {

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
    <div className='blogreportsbox'>
      <div className="container">
        <div className="row">
          {
            users.length === 0 ?
              <div className="noreportfound mt-5">
                No Reports Found
              </div>
              :
              (
                users.map(user => (
                  <div className="col-lg-4 col-md-6 col-sm-12" key={user._id}>
                    <div className='admin-users-box'>
                      <div className="user-admin-upper">
                        <img src={user.avatar || '/images/user-avatar.png'} alt="Avatar" />
                        <div className='user-admin-nameid'>
                          <div className="user-admin-id">_id : {user._id}</div>
                          <div className="user-admin-name">Name : {user.name}</div>
                        </div>
                      </div>
                      <button className='copy-user-id' onClick={() => copyBlogId(user._id)}>Copy User Id</button>
                    </div>
                  </div>
                ))
              )
          }
        </div>
      </div>

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

export default Userreports