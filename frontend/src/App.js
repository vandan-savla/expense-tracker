import React, { useContext, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import PrivateRoute from './Components/Private Route/PrivateRoute';
import Dashboard from './Components/Dashboard/Dashboard';

import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import Profile from './Components/Profile/Profile';
import { AuthContext } from "./context/AuthContext";
import Navbar from './Components/Navbar/Navbar';
import AddExpense from './Components/Expenses/AddExpense';
import AddIncome from './Components/Income/AddIncome';
import AllExpenses from './Components/Expenses/AllExpenses';
import AllIncomes from './Components/Income/AllIncomes';
// import AuthPage from './Components/Auth/AuthPage';

function App() {

  const { loading, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  // const navigate = useNavigate();

  const noNavbarRoutes = ['/signin', '/signup'];
  const shouldShowNavbar = isAuthenticated && !noNavbarRoutes.includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>

        <Route element={<PrivateRoute />} >

          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/add-income" element={<AddIncome />} />
          <Route exact path="/add-expenses" element={<AddExpense />} />
          <Route exact path="/expenses" element={<AllExpenses />} />
          <Route exact path="/incomes" element={<AllIncomes />} />
          {/* <Route exact path="/" element={<Profile />} /> */}


        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App;