import React, {useState} from 'react';
import {NavLink } from "react-router-dom";

const NavBar = props => {
    const [toggle, setToggle] = useState(false);
    return <nav className="navbar small sticky-top navbar-expand-sm navbar-dark bg-dark" role="navigation">
        <NavLink className="navbar-brand" to="/">Inicio</NavLink>
        <button
            className="navbar-toggler btn-sm"
            type="button"
            onClick={() => setToggle(prev=> !prev)}
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" style={{display: `${toggle ? 'block' : 'none'}`}}>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/notes/index">Notes</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav float-right">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/notes/add">New Note</NavLink>
                </li>
            </ul>
        </div>
    </nav>
};

export default NavBar;