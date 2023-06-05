import React, {useState} from 'react';
import classes from './SuperpowersItem.module.scss';
import Button from "../../../UI/Button/Button.jsx";
import Input from "../../../UI/Input/Input.jsx";
import {editSuperpower, removeSuperpower} from "../../../../api/superpowers.js";
import {useDispatch} from "react-redux";
import {superheroesActions} from "../../../../store/superheroes-slice.js";

const SuperpowersItem = ({power}) => {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [powerValue,setPowerValue]=useState(power.name)
    console.log(power)
    // const editHandler=
    const closeHandler = ()=>{
        setIsEdit(false);
        setPowerValue(power.name)
    }
    const saveHandler=()=>{
        console.log(powerValue)
        editSuperpower(power.id,powerValue).then(superpower=>{
            dispatch(superheroesActions.editOneSuperpower({id:power.id,superpower}));
        })
        setIsEdit(false)
    }
    const removeHandler = ()=>{
        removeSuperpower(power.id).then(()=>{
            dispatch(superheroesActions.removeOneSuperpower({id:power.id}));
        })
        setIsEdit(false);
    }
    return (
        <li className={classes.item}>
            {!isEdit ? <p>{power.name}</p> :
                <Input value={powerValue} onChange={(e) => setPowerValue(e.target.value)}/>}
            {!isEdit ? <div className={classes.actions}>
                    <Button className={classes.edit} onClick={() => setIsEdit(true)}>Edit</Button>
                    <Button className={classes.remove} onClick={removeHandler}>Remove</Button>
                </div> :
                <div className={classes.actions}>
                    <Button className={classes.save} onClick={saveHandler}>Save</Button>
                    <Button className={classes.close} onClick={closeHandler}>Close</Button>
                </div>}
        </li>
    );
};

export default SuperpowersItem;