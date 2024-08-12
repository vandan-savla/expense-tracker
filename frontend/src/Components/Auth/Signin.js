import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'

import "./auth-style.css"
function Signin() {
  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signin(username,password)
    if (result.success) {
      navigate('/');
    }
    else{
      setError(result.message);
    }
 
  };

  return (
    <div className="container">
      <div className="main-div row align-items-center">

        {/* <div> */}

        <form className="form justify-content-center d-flex flex-column flex-wrap p-4 border-1" onSubmit={handleSubmit} method='post'>
          <h2 >Sign In</h2>
          <hr />
          <span className='text-danger text-capitalize'>
            {error && <p >{error}</p>}
          </span>
          <div className="mb-3">
            <label for="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control" id="email" placeholder="name@example.com"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div>

            <button type="submit" className="w-50 btn btn-primary" >
              Sign In
            </button>
            {/* <Navigate to = "/signup">Don't have account? Register </Navigate> */}
            <a className='p-3  w-50'> <Link to = "/signup" >Don't have account? Register </Link> </a>
            {/* <a href="/signup" className='p-3  w-50'> Don't have account? Register</a> */}
          </div>




        </form>
        {/* </div> */}
      </div>


    </div>
  );
}

export default Signin;