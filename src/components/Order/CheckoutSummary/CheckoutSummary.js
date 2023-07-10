import React from 'react';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes well</h1>
            <div style={{withd:'100% '
            ,margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            clicked={props.checkoutCancelled}
            btnType="Danger">
                CANCEL
            </Button>
            <Button 
            clicked={props.checkoutContinued}
            btnType="Success">
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;
