import React, {useEffect, useState} from 'react';
import classes from './SuperheroesList.module.scss';
import Button from "../../UI/Button/Button.jsx";
import SuperheroCard from "../SuperheroCard/SuperheroCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getSuperheroes} from "../../../api/superheroes.js";
import {superheroesActions} from "../../../store/superheroes-slice.js";
import {uiActions} from "../../../store/pagination-slice.js";
import Spinner from "../../UI/Spinner/Spinner.jsx";

const SuperheroesList = () => {
    const dispatch = useDispatch();

    const ui = useSelector(state => state.ui);
    const superheroes = useSelector(state => state.superheroes);

    const [isLoading, setIsLoading] = useState(true);
    const pageCount = Math.ceil(ui.count / ui.limit);

    useEffect(() => {
        getSuperheroes(ui.page, ui.limit).then(data => {
            dispatch(superheroesActions.setSuperheroes(data.heroes));
            dispatch((uiActions.setCount(data.count)));
        }).finally(() => setIsLoading(false));

    }, [ui.page])

    const goToTheNextPage = () => {
        if (ui.page === pageCount) {
            return;
        }

        dispatch(uiActions.nextPage())
    }
    const goToThePrevPage = () => {
        if (ui.page === 1) {
            return;
        }

        dispatch(uiActions.prevPage())
    }
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <section className={classes.wrapper}>
            <div className={classes.list}>
                {superheroes.superheroesList.length !== 0 ? superheroes.superheroesList.map(hero => <SuperheroCard key={hero.id} hero={hero}/>) :
                    <p>Have no data</p>
                }
            </div>

            <div className={classes.actions}>
                <Button onClick={goToThePrevPage}>Prev</Button>
                <Button onClick={goToTheNextPage}>Next</Button>
            </div>
        </section>
    );
};

export default SuperheroesList;