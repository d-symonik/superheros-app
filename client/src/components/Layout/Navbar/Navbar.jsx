import React from 'react';
import {NavLink} from "react-router-dom";
import {CREATE_ROUTE, SUPERHEROES_ROUTE} from "../../../util/constants/router-paths.js";
import classes from './Navbar.module.scss';
const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <ul>
                <li>
                    <NavLink to={SUPERHEROES_ROUTE}>List of all superheroes</NavLink>
                </li>
                <li>
                    <NavLink to={CREATE_ROUTE}>Add a new superhero </NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;