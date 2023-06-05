import React from 'react';
import classes from './SuperheroesPage.module.scss';
import Card from "../UI/Card/Card.jsx";
import SuperheroesList from "./SuperheroesList/SuperheroesList.jsx";

const SuperheroesPage = () => {
    return (
        <Card className={classes.superheroes}>
            <h1>Superheroes</h1>
            <SuperheroesList/>
        </Card>
    );
};

export default SuperheroesPage;