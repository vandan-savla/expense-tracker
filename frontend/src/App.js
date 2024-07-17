import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';

import Dashboard from './Components/Dashboard/Dashboard';

import Signin from './Components/Auth/Signin';
import Signup from './Components/Auth/Signup';
import Profile from './Components/Profile/Profile';
// import { AuthContext } from "./context/AuthContext";
// import AuthPage from './Components/Auth/AuthPage';

function App() {

  // const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>

      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>
    </div>
  )
}

export default App;