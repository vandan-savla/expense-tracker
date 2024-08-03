import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavbarTemplate from './NavbarTemplate';

function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext)
    return (
        
        <>
            {
                isAuthenticated ? <NavbarTemplate /> : null
        }</>

    );
}


export default Navbar;