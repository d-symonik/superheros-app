import React from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './CreateSuperheroPage.module.scss';
import CreateHeroForm from "./CreateHeroForm/CreateHeroForm.jsx";
const CreateSuperheroPage = () => {
    return (
        <Card className={classes.create}>
            <h1>Create a new hero</h1>
            <CreateHeroForm/>
        </Card>
    );
};

export default CreateSuperheroPage;