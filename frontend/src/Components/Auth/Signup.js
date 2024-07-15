import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// Import CSS for styling (create this file)
import './auth-style.css';

const Signup = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log(name, username, password);
    // setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/v1/sign-up', {
       
        name, username, password
      });
      console.log('Signup successful:', response.data);

      // setLoading(false);
      alert('Signed up successfully! Redirecting to signin page.');
      navigate('/signin');
    } catch (error) {
      console.log(error)
      // setLoading(false);
      if (error.response) {

        setError(error.response.data.message); // Assuming backend sends error message in response
        // setError(error.response.data); // Assuming backend sends error message in response
        // setError(error.response.data.message); // Assuming backend sends error message in response
      } else {
        // Something happened in setting up the request that triggered an error
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="main-div row align-items-center">

        {/* <div> */}

          <form className="form justify-content-center d-flex flex-column flex-wrap p-4 border-1" onSubmit={handleSubmit} method='post'>
            <h2 >Sign Up</h2>
            <hr />
            <span  className='text-bg-danger'>
            {error && <p>{error}</p>}
            </span>
            <div className="mb-3">
              <label for="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control" id="email" placeholder="name@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label for="email" className="form-label">Name</label>
              <input
                type="text"
                className="form-control" id="name" placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              Sign Up
            </button>
            <a href="/signin" className='p-3  w-50'> Already have account? Login</a>
            </div>




          </form>
        {/* </div> */}
      </div>


    </div>
  );
};

export default Signup;
