import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
    <div className='notFoundForm'>
      <img className='notFoundError' src="https://i.giphy.com/qkLqpGZhf1ACB8WbTl.webp" alt="NotFound" />
    </div>
    <div>
      <div className="text-center notFoundPageWarning">
        <br />
        <p className="text-center">Didn't find what you were looking for ?</p>
        <Link to="/" className="btn btn-warning mx-3" style={{fontWeight: 'bold'}}>
          Back Home
        </Link>
        <Link to="/basvuru-sorgula" className="btn btn-info mx-3" style={{fontWeight: 'bold'}}>
          Search Form
        </Link>
      </div>
    </div>
    </>
  )
}

export default NotFound