import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes} from "../routes/routes.js";
import {SUPERHEROES_ROUTE} from "../util/constants/router-paths.js";
import Superheroes from "../pages/Superheroes.jsx";

const SuperheroesRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} Component={Component}/>)}
            <Route path='/' element={<Navigate to={SUPERHEROES_ROUTE} replace/>}/>
            <Route path='*' Component={Superheroes}/>
        </Routes>
    );
};

export default SuperheroesRouter;