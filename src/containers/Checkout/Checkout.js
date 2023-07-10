import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux'


class Checkout extends Component{
    
    checkoutCancelled =() => {
        this.props.history.goBack()
    }
    checkoutContinued =() => {
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        let summary = <Redirect to="/"/>
        let purchased = this.props.purchased ? <Redirect to="/"/> :null;
        if(this.props.ingr){
            summary = (
                <div>
                    {purchased}
                    <CheckoutSummary ingredients={this.props.ingr}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}/>
                    <Route path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>
                </div>
            )
        }
        return (
            summary
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ingr: state.bgr.ingredients,
        ttlPrice: state.bgr.totalPrice,
        purchased: state.ord.purchased
    }
}


export default connect(mapStateToProps)(Checkout);