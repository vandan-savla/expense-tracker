import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import ProfileForm from './ProfileForm';

function Profile() {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  // console.log(useContext(AuthContext))
  if (loading) {
    // console.log('l')
    return <h1>Loading...</h1>
  } else {
    if (user && isAuthenticated) {
      return (
        <div>
          <ProfileForm />
        </div>
      )
    }
  }
}

export default Profile