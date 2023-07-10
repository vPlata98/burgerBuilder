import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'} 
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p> This is the price <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => <BuildControl 
        key={ctrl.label} 
        label={ctrl.type}
        added={()=> props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabledButtons={props.disabled[ctrl.type]}/>)}
        <button 
        onClick={props.ordered}
        className={classes.OrderButton} 
        disabled={!props.purchasable}> {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
)

export default buildControls;

