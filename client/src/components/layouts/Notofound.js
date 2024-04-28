import React from 'react'

const Notofound = () => {
    return (
        <div className='notfound'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="subnotfound">
                            <div className="message404">
                                404 - Not Found
                            </div>
                            <div className="notfoundmsg">
                                The page you are looking for does not exist. <br />
                                Please enter a valid url
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </div>
    )
}

export default Notofound