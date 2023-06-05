import React from 'react';
import classes from './Header.module.scss';
import {Link} from "react-router-dom";
import {SUPERHEROES_ROUTE} from "../../../util/constants/router-paths.js";
import Navbar from "../Navbar/Navbar.jsx";
const Header = () => {
    return (
        <header className={classes.header}>
            <h3><Link to={SUPERHEROES_ROUTE}>Superheroes</Link></h3>
            <Navbar/>
        </header>
    );
};

export default Header;