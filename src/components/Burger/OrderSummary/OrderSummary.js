import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class orderSummary extends Component {
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            (ingr,index) => (<li key={index}>
                <span style={{textTransform: 'capitalize'}}>
                    {ingr}
                </span>:{this.props.ingredients[ingr]}</li>)
        )
        return (
            <Aux>
                <h3>Your Order</h3>
                <p> A delicius burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkOut?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    };
}

export default orderSummary;
