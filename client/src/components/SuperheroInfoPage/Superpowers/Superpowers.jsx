import React, {useState} from 'react';
import classes from './Superpowers.module.scss';
import SuperpowersItem from "./SuperpowerItem/SuperpowersItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addSuperpower} from "../../../api/superpowers.js";
import {superheroesActions} from "../../../store/superheroes-slice.js";
import Button from "../../UI/Button/Button.jsx";
import Input from "../../UI/Input/Input.jsx";

const Superpowers = ({superheroId}) => {
    const superheroes = useSelector(state => state.superheroes);
    const [enteredSuperpower, setEnteredSuperpower] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const dispatch = useDispatch();
    const addSuperpowerHandler = () => {
        addSuperpower(superheroId, enteredSuperpower).then(data => {
                dispatch(superheroesActions.addOneSuperpower(data))
                setIsCreating(false)
                setEnteredSuperpower('');
            }
        )
            .catch(err => console.log(err));
    }
    const closeHandler = () => {
        setIsCreating(false);
        setEnteredSuperpower('');
    }
    return (
        <div className={classes.superpowers}>

            <h2>Superpowers</h2>
            {superheroes.superpowers.length !== 0 ? <ul>
                {superheroes.superpowers.map(power => <SuperpowersItem power={power}/>)}

            </ul> : <p>Have not superpowers</p>}
            {isCreating && <div className={classes.create}>
                <Input placeholder={'Enter a superpower name'} value={enteredSuperpower}
                       onChange={(e) => setEnteredSuperpower(e.target.value)}/>
                <div className={classes.actions}>

                    <Button onClick={addSuperpowerHandler}>Add</Button>
                    <Button onClick={closeHandler}>Close</Button>

                </div>

            </div>}
            <div className={classes.actions}>
                <Button onClick={() => setIsCreating(true)}>Add new superpower</Button>
            </div>
        </div>
    );
};

export default React.memo(Superpowers);