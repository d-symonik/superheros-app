import React from 'react';
import classes from './Spinner.module.scss';

const Spinner = () => {
    return (
        <div className={classes.loader}>
            <div className={classes["custom-loader"]}></div>
        </div>
    );
};

export default Spinner;