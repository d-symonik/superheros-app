import React from 'react';
import classes from './Input.module.scss';

function Input(props) {
    const {
        id,
        label,
        type,
        placeholder,
        value,
        onChange,
        onBlur,
        className,
        accept,
        multiple
    } = props;

    const inputStyles = `${classes.input} ${className}`;

    return (
        <div className={inputStyles}>

            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type={type || 'text'}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                accept={accept}
                multiple={multiple}
            />
        </div>
    );
}

export default Input;