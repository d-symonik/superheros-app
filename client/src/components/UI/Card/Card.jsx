import React from 'react';
import classes from './Card.module.scss';
const Card = ({className,onClick, children}) => {
    const cardStyles = `${classes.card} ${className ? className : ''}`;

    return (
        <section className={cardStyles} onClick={onClick}>
            {children}
        </section>
    );
};

export default Card;