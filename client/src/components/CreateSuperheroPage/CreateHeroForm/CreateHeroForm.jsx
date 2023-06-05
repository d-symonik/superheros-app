import React, {useState} from 'react';
import Input from "../../UI/Input/Input.jsx";
import classes from './CreateHeroForm.module.scss';
import Button from "../../UI/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {SUPERHEROES_ROUTE} from "../../../util/constants/router-paths.js";
import {createSuperhero} from "../../../api/superheroes.js";

const CreateHeroForm = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [enteredNickname, setEnteredNickname] = useState('');
    const [enteredRealName, setEnteredRealName] = useState('');
    const [enteredOriginDescription, setEnteredOriginDescription] = useState('');
    const [enteredCatchPhrase, setEnteredCatchPhrase] = useState('');
    const [enteredImages, setEnteredImages] = useState(null);
    const [superheroSkills, setSuperheroSkills] = useState([]);
    const nicknameInputHandler = (event) => {
        setEnteredNickname(event.target.value);
    }
    const realNameInputHandler = (event) => {
        setEnteredRealName(event.target.value);
    }
    const originDescriptionInputHandler = (event) => {
        setEnteredOriginDescription(event.target.value);
    }
    const catchPhraseInputHandler = (event) => {
        setEnteredCatchPhrase(event.target.value);
    }

    const imagesInputHandler = (event) => {
        setEnteredImages(event.target.files[0]);
    }
    const addInfo = () => {
        setSuperheroSkills(prevState => [...prevState, {id: Date.now(), name: ''}])
    };
    const removeInfo = (id) => {

        setSuperheroSkills(prevState => prevState.filter(info => info.id !== id));
        if (superheroSkills.length === 1) {
            setSuperheroSkills(prevState => prevState.filter(info => info.id !== id));
        }
    };
    const changeInfo = (key, value, id) => {
        setSuperheroSkills(prevState => prevState.map(item => item.id === id ? {...item, [key]: value} : item))
    };
    const validateForm = () => {
        if (
            typeof enteredNickname !== 'string' ||
            enteredNickname.charAt(0) !== enteredNickname.toUpperCase().charAt(0) ||
            enteredNickname.length < 2
        ) {
            setError({nickname: 'Input correct nickname. (The nickname must begin with a capital letter and contain at least 2 letters)'});
            throw new Error('Nickname');
        }
        if (
            typeof enteredRealName !== 'string' ||
            enteredRealName.charAt(0) !== enteredRealName.toUpperCase().charAt(0) ||
            enteredRealName.length < 2
        ) {
            setError({realname: 'Input correct real name. (The real name must begin with a capital letter and contain at least 2 letters)'});
            throw new Error('Real Name');
        }
        if (
            typeof enteredOriginDescription !== 'string' ||
            enteredOriginDescription.charAt(0) !== enteredOriginDescription.toUpperCase().charAt(0) ||
            enteredOriginDescription.length < 10
        ) {
            setError({origin: 'Input correct Origin Description. (The origin description must begin with a capital letter and contain at least 10 letters)'});
            throw new Error('Real Name');
        }
        if (
            typeof enteredCatchPhrase !== 'string' ||
            enteredCatchPhrase.charAt(0) !== enteredCatchPhrase.toUpperCase().charAt(0) ||
            enteredCatchPhrase.length < 10
        ) {
            setError({catch: 'Input correct catch phrase. (The catch phrase must begin with a capital letter and contain at least 10 letters)'});
            throw new Error('Real Name');
        }
        if (enteredImages.length === 0) {
            setError({images: 'Select the pictures'});
            throw new Error('Images');

        }
        if (enteredImages) {


            const extension = enteredImages.name.split('.');
            if (extension[extension.length - 1] !== 'jpeg' && extension[extension.length - 1] !== 'png' && extension[extension.length - 1] !== 'jpg') {
                setError({images: 'Image format must be .jpg, .jpeg or .png'});
                throw new Error('Image');
            }
        }

        if (superheroSkills.length === 0) {
            setError({superpower: 'Add a superpower'});
            throw new Error('Info');
        }


        superheroSkills.map(item => {
            if (
                typeof item.name !== 'string' ||
                item.name.charAt(0) !== item.name.toUpperCase().charAt(0) ||
                item.name.length < 2
            ) {
                setError({superpower: 'Input correct name of the superpower. (The name must begin with a capital letter and contain at least 2 letters)'});
                throw new Error('Info');
            }


        })

    }
    const submitHandler = (event) => {
        try {
            event.preventDefault();
            validateForm();
            console.log(enteredImages);
            const superhero = new FormData();
            superhero.append('nickname', enteredNickname);
            superhero.append('real_name', enteredRealName);
            superhero.append('origin_description', enteredOriginDescription);
            superhero.append('catch_phrase', enteredCatchPhrase);
            superhero.append('superpowers', JSON.stringify(superheroSkills));
            superhero.append('image', enteredImages)
            createSuperhero(superhero).then(data => {
                navigate(SUPERHEROES_ROUTE);
            }).catch(err => console.log(err));

            setEnteredNickname('');
            setEnteredRealName('');
            setEnteredOriginDescription('');
            setEnteredCatchPhrase('');
            setEnteredImages(null);
            setSuperheroSkills([]);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form className={classes.form} onSubmit={submitHandler} encType='multipart/form-data'>
            <div className={classes.control}>
                <Input label={'Nickname'}
                       placeholder={'Enter the nickname...'}
                       type="text"
                       value={enteredNickname}
                       onChange={nicknameInputHandler}
                />
            </div>
            {error?.nickname && <p className={classes.error}>{error.nickname}</p>}
            <div className={classes.control}>
                <Input label={'Real Name'}
                       placeholder={'Enter the real name...'}
                       type="text"
                       value={enteredRealName}
                       onChange={realNameInputHandler}/>
            </div>
            {error?.realname && <p className={classes.error}>{error.realname}</p>}
            <div className={classes.control}>
                <Input label={'Origin Description'}
                       placeholder={'Enter the origin description...'}
                       type="text"
                       value={enteredOriginDescription}
                       onChange={originDescriptionInputHandler}/>
            </div>
            {error?.origin && <p className={classes.error}>{error.origin}</p>}
            <div className={classes.control}>
                <Input label={'Catch Phrase'}
                       placeholder={'Enter the catch phrase...'}
                       type="text"
                       value={enteredCatchPhrase}
                       onChange={catchPhraseInputHandler}/>
            </div>
            {error?.catch && <p className={classes.error}>{error.catch}</p>}

            <div className={classes.control}>
                <Input label={'Images'} type="file" onChange={imagesInputHandler}
                       accept={'.jpg, .jpeg, .png'}/>
            </div>
            {error?.images && <p className={classes.error}>{error.images}</p>}
            <p>Superpowers</p>
            {superheroSkills.map(info =>
                <div className={`${classes.control} ${classes.info}`} key={info.id}>
                    <Input placeholder={'Enter the description'}
                           onChange={(e) => changeInfo('name', e.target.value, info.id)}/>
                    <Button type="button" onClick={() => removeInfo(info.id)}>Remove</Button>
                </div>
            )}
            {error?.superpower && <p className={classes.error}>{error.superpower}</p>}
            <div className={classes.control}>
                <Button type='button' onClick={addInfo}>Add a New Hero Superpower</Button>
            </div>
            <div className={classes.actions}>
                <Button>Add New Hero</Button>
                <Button type="button">Clear</Button>
            </div>
        </form>
    );
};

export default CreateHeroForm;