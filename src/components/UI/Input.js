import React from 'react';
import classes from './Input.module.css';
const Input = React.forwardRef((props, ref) =>{
    const inputHandler = (ev) => {

    }
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
         <input ref={ref} {...props.input} onChange={inputHandler} />
    </div>
})
export default Input;