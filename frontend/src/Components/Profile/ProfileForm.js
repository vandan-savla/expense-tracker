import React from 'react'

function ProfileForm() {
    return (
        <div className="container">
          <div className="main-div row align-items-center">
    
            {/* <div> */}
    
              <form className="form justify-content-center d-flex flex-column flex-wrap p-4 border-1" onSubmit={handleSubmit} method='post'>
                <h2 >Your Profile</h2>
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
    
                {/* <button type="submit" className="w-50 btn btn-primary" > */}
                  {/* Sign Up */}
                {/* </button> */}
                {/* <a className='p-3  w-50'> <Link to = "/signin" >Already have account? Login </Link> </a> */}
    
                {/* <a href="/signin" className='p-3  w-50'> Already have account? Login</a> */}
                </div>
    
    
    
    
              </form>
            {/* </div> */}
          </div>
    
    
        </div>
      );
}

export default ProfileForm