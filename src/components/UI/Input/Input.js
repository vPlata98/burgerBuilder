import classes from './Input.css'

import React from 'react';

const input = (props) => {
    let inputElement = null;
    const elemClass = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched){
        elemClass.push(classes.Invalid)
    }
    switch(props.elementType){
        case('input'):
            inputElement = <input className={elemClass.join(' ')} 
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;
        case('textarea'):
            inputElement = <textarea className={elemClass.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}/>
            break;
        case('select'):
            inputElement = (<select className={elemClass.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(
                    (opt) => {
                        return (<option key={opt.value} value={opt.value}>{
                            opt.displayValue
                        }</option>)
                    }
                )
            }</select>)
            break;
        default:
            inputElement = <input className={classes.InputElement} 
            {...props.elementConfig}
            value={props.value}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
