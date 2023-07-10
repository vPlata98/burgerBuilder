import React from 'react';
import classes from './Order.css'
const order = (props) => {
    const ingredientsArray = []
    for(let ingredientName in props.ingredients){
        ingredientsArray.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]    
        })
    }
    const ingredientsAmount = ingredientsArray.map(ig => <span 
        style={{textTransform:'capitalize',
        display:'inline',
        margin:'0 8px',
        border: '1px solid #ccc',
        padding: '5px'
    }}
        key={ig.name}>{ig.name} ({ig.amount})</span>)
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsAmount}    </p>
            <p>Price:<strong>USD {props.price.toFixed(2)}</strong>    </p>
        </div>
    );
};

export default order;
