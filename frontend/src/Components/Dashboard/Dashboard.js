import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";

function Dashboard() {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  // console.log(useContext(AuthContext))
  

  if (loading) {
    // console.log('l')
    return <h1>Loading...</h1>
  } else {
    if (user && isAuthenticated) {
      return (
        <div>
          <h1>Welcome, {user.name} to Dashboard</h1>
        </div>
      )
    }
  }

}

export default Dashboard