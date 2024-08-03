import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

import  './NavbarTemplate.css';

function NavbarTemplate() {
    const {logout} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Expense Tracker</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={ ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}  aria-current="page" to="/">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={ ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} aria-current="page" to="/profile">Profile</NavLink>
                        </li>

                    </ul>
                    <form className="d-flex">

                 <button className="btn btn-danger"onClick={logout} >Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default NavbarTemplate