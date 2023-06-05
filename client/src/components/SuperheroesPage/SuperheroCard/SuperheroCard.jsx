import React from 'react';
import Card from "../../UI/Card/Card.jsx";
import classes from './SuperheroCard.module.scss';
import {useNavigate} from "react-router-dom";
import Image from '../../../assets/images.png'
import {SUPERHERO_INFO_ROUTE} from "../../../util/constants/router-paths.js";

const SuperheroCard = ({hero}) => {
    const navigate = useNavigate();
    const heroImage = hero.images.length!==0 ?`${import.meta.env.VITE_REACT_APP_SERVER_URL}${hero.images[0].image}`:Image;
    return (
        <Card className={classes.hero} onClick={()=>navigate(`${SUPERHERO_INFO_ROUTE}/${hero.id}`)}>
                <img src={heroImage} alt={hero.nickname}/>
            <div className={classes.body}>
                <p>{hero.nickname}</p>
            </div>
        </Card>
    );
};

export default SuperheroCard;