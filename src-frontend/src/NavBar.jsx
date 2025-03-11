import ffrLogo from "/frlogo.svg";
import './NavBar.css'
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from './context/AuthContext'

const NavBar = () => {
    const {userData, logout} = useContext(AuthContext)
    
return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <span>
                        <img className="logo" src={ffrLogo} alt="Page Logo" />
                    </span>
                    Jobly
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {userData !== "" ? 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/companies">
                                    Companies
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/jobs">
                                    Jobs
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">
                                    Profile
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" onClick={logout}>
                                    Logout {userData.username}
                                </NavLink>
                            </li>
                        </ul> :
                        <ul className="navbar-nav ms-auto">                    
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    </div>
);
};

export default NavBar;
