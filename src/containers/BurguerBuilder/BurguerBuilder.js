import Aux from '../../hoc/Aux/Aux'
import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux'
import * as actionCreators from '../../store/actions/index'
import axios from '../../axios.orders'



class BurguerBuilder extends Component{
    state = {
        purchasing: false,
    }
    componentDidMount (){
        this.props.onInitIngredients();
    }
    updatePurchaseState= (ingredients)=>{
        const sum = Object.keys(this.props.ingr).map(
            (key) => this.props.ingr[key]
        ).reduce(
            (prevEl,el) => el + prevEl 
        ,0);
        
        return sum>0
        
    }
    
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.onAuthSetUrl('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = ()=>{
        this.props.onPurchaseInit()
        this.props.history.push('/checkout/')
    }
    render(){
        const disabledInfo ={
            ...this.props.ingr
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.err ? <p>ALL BROKEN</p>:<Spinner/>
        if(this.props.ingr){
            burger = <Aux>
            <Burger ingredients={this.props.ingr}/>
                <BuildControls 
                ingredientsRemoved={ this.props.onRemoveIngredient}
                ingredientsAdded={ this.props.onAddIngredient}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState()}
                price={this.props.ttlPrice}
                ordered={this.purchaseHandler}
                isAuthenticated={this.props.isAuthenticated}/>
            </Aux>
            orderSummary = <OrderSummary 
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            price={this.props.ttlPrice}
            ingredients={this.props.ingr}/>;
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        ingr: state.bgr.ingredients,
        ttlPrice: state.bgr.totalPrice,
        err: state.bgr.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchtoProps = (dispatch) => {
    return{
        onAddIngredient: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: ()=>dispatch(actionCreators.initIngredients()),
        onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
        onAuthSetUrl: (path) => dispatch(actionCreators.authSetUrl(path))
    }
}
export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorHandler(BurguerBuilder,axios));