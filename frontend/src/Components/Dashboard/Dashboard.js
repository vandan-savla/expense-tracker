import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import ExpenseChart from '../Chart/ExpenseChart';
function Dashboard() {
  const { isAuthenticated, user, loading } = useContext(AuthContext)
  // console.log(useContext(AuthContext))


  if (loading) {

    return <h1>Loading...</h1>
  } else {
    if (user && isAuthenticated) {
      return (
        <div>
          <ExpenseChart />

        </div>
      )
    }
  }

}

export default Dashboard