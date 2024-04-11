import React from 'react'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import { Route, Routes } from "react-router-dom";
import Home from '../HomeLayout/Home';
function Landing() {
    return (
        <div>Landing
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {/* <Signup />
            <Login /> */}
        </div>
    )
}

export default Landing