import React, {useEffect, useState} from 'react';
import Card from "../UI/Card/Card.jsx";
import classes from './SuperheroInfoPage.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {TiDeleteOutline} from "react-icons/ti";
import {IoAddCircleOutline} from "react-icons/io5";
import Superpowers from "./Superpowers/Superpowers.jsx";
import {useDispatch} from "react-redux";
import {getOneSuperhero, removeSuperhero, updateSuperhero} from "../../api/superheroes.js";
import Spinner from "../UI/Spinner/Spinner.jsx";
import {addImage, removeImage} from "../../api/superheroImages.js";
import Button from "../UI/Button/Button.jsx";
import {SUPERHEROES_ROUTE} from "../../util/constants/router-paths.js";
import {superheroesActions} from "../../store/superheroes-slice.js";
import Input from "../UI/Input/Input.jsx";

const SuperheroInfoPage = () => {
    const params = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [superhero, setSuperhero] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [enteredNickname, setEnteredNickname] = useState('');
    const [enteredRealName, setEnteredRealName] = useState('');
    const [enteredOrigin, setEnteredOrigin] = useState('');
    const [enteredCatchPhrase, setEnteredCatchPhrase] = useState('');

    const [error, setError] = useState(null);
    useEffect(() => {
        getOneSuperhero(params.id).then(data => {
            setSuperhero(data);

            dispatch(superheroesActions.setSuperpowers(data.skills));

        }).catch(err => {
            setError(err.response.data.message)
        }).finally(() => setIsLoading(false));

    }, [])

    const nicknameInputHandler = (event) => {
        setEnteredNickname(event.target.value);
    }
    const realnameInputHandler = (event) => {
        setEnteredRealName(event.target.value);
    }
    const originInputHandler = (event) => {
        setEnteredOrigin(event.target.value);
    }
    const catchphraseInputHandler = (event) => {
        setEnteredCatchPhrase(event.target.value);
    }

    const closeHandler = () => {
        setIsEditing(false);
        setEnteredNickname(superhero.nickname);
        setEnteredRealName(superhero.real_name);
        setEnteredOrigin(superhero.origin_description);
        setEnteredCatchPhrase(superhero.catch_phrase);
    };


    if (isLoading) {
        return <Spinner/>
    }
    if (error) {
        return <Card className={classes.error}>
            <p>{error}</p>
            <Button onClick={() => navigate(SUPERHEROES_ROUTE)}>Go to the Home</Button>
        </Card>
    }
    const addImageHandler = (event) => {
        console.log(event.target.files);
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        addImage(params.id, formData).then((data) => {

            setSuperhero(prevState => ({
                ...prevState,
                images: [data, ...prevState.images],

            }))
        });

    };
    const removeImageHandler = (id) => {

        removeImage(id).then(() => {
            setSuperhero(prevState => ({
                ...prevState,
                images: prevState.images.filter(image => image.id !== id),

            }));
        });

    };
    const deleteHeroHandler = ()=>{
        removeSuperhero(params.id).then(()=> {
            alert(`Hero ${superhero.nickname} successfully deleted`);
            navigate(SUPERHEROES_ROUTE);
        }).catch(err=>{
            alert(err.response.data.message)
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const superhero = {
            ...(enteredNickname && {nickname: enteredNickname}),
            ...(enteredRealName && {real_name: enteredRealName}),
            ...(enteredOrigin && {origin_description: enteredOrigin}),
            ...(enteredCatchPhrase && {catch_phrase: enteredCatchPhrase}),
        }
        console.log(superhero)
        updateSuperhero(params.id, superhero).then(data => {
            setSuperhero(prevState => ({...prevState, ...data}))
        }).catch(err => console.log(err))
        console.log(superhero)
        setIsEditing(false)
    };
    return (
        <Card className={classes.superhero}>
            <h1>{superhero.nickname}</h1>
            <div className={classes.info}>
                {!isEditing ? <div className={classes.text}>
                        <p><b>Real Name:</b> {superhero.real_name}</p>
                        <p><b>Origin Description:</b> {superhero.origin_description}</p>
                        <p><b>Catch Phrase:</b> {superhero.catch_phrase}</p>
                        <div className={classes.actions}>
                            <Button className={classes.edit} onClick={() => setIsEditing(true)}>Edit</Button>
                            <Button  className={classes.delete} onClick={deleteHeroHandler}>Delete</Button>

                        </div>

                    </div>
                    :
                    <form onSubmit={submitHandler}>
                        <Input
                            label={'Nickname'}
                            placeholder={'Enter the nickname'}
                            value={enteredNickname}
                            onChange={nicknameInputHandler}

                        />
                        <Input
                            label={'Real Name'}
                            placeholder={'Enter the real name'}
                            value={enteredRealName}
                            onChange={realnameInputHandler}
                        />
                        <Input
                            label={'Origin Description'}
                            placeholder={'Enter the origin description'}
                            value={enteredOrigin}
                            onChange={originInputHandler}
                        />
                        <Input
                            label={'Catch Phrase'}
                            placeholder={'Enter the catch phrase'}
                            value={enteredCatchPhrase}
                            onChange={catchphraseInputHandler}
                        />
                        <div className={classes.actions}>
                            <Button>Submit</Button>
                            <Button onClick={closeHandler}>Close</Button>
                        </div>
                    </form>
                }
                <div className={classes.details}>
                    <div className={classes.wrapper}>
                        <div className={classes.images}>
                            <h2>Images</h2>
                            {superhero && superhero.images.length !== 0 &&

                                superhero.images.map(({id, image}) => <div key={id} className={classes.image}>
                                    <img src={`${import.meta.env.VITE_REACT_APP_SERVER_URL}${image}`}
                                         alt='SuperHero Image'/>
                                    <div className={classes.action}>
                                        <TiDeleteOutline size={30} onClick={() => removeImageHandler(id)}/>
                                    </div>
                                </div>)
                            }
                            <div className={classes.add}>
                                <label htmlFor="file-upload">
                                    <IoAddCircleOutline size={50}/>
                                    <p>Add a new image</p>
                                </label>
                                <input id="file-upload" type="file" accept={'.jpg, .jpeg, .png'}
                                       onChange={addImageHandler}/>
                            </div>


                        </div>
                        <Superpowers superheroId={params.id}/>
                    </div>

                </div>

            </div>
        </Card>
    )
        ;
};

export default SuperheroInfoPage;