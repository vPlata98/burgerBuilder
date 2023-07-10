
import classes from './ContactData.css'
import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios.orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {checkValidity}  from '../../../Shared/utility'

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type: 'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                ]
                },
                value:'fastest',
                valid:true,
                validation: {
                }
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        let formData={}
        for(let param in this.state.orderForm){
            formData[param] = this.state.orderForm[param].value
        }
        const order = {
            ingredients: this.props.ingr,
            price: this.props.ttlPrice,
            orderData: formData,
            userId: this.props.id
        }
        this.props.onPurchaseStart(order,this.props.token)
    }
    inputChangedHandler = (event, identifier) =>{
        const updatedForm = {...this.state.orderForm}
        const updatedFormElement = {...updatedForm[identifier]}
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement
        let IsValid=true
        for(let param in updatedForm){
            IsValid = updatedForm[param].valid && IsValid
        }
        
        this.setState({
            orderForm:updatedForm,
            formIsValid:IsValid
        })
    }
    render(){
        const formElement = []
        for(let param in this.state.orderForm){
            formElement.push({
                id: param,
                config: this.state.orderForm[param]
            })
        }
        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElement.map(
                        (elem) => (<Input 
                            key={elem.id}
                            value={elem.config.value}
                            elementConfig={elem.config.elementConfig}
                            elementType={elem.config.elementType}
                            invalid={!elem.config.valid}
                            shouldValidate={elem.config.validation}
                            touched={elem.config.touched}
                            changed={(event) => this.inputChangedHandler(event,elem.id)}/>)
                    )}
                    
                    <Button 
                    disabled={!this.state.formIsValid}
                    btnType="Success">Order </Button>
                </form>
        )
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your data</h4>
                {form}
            </div>
        );
    }
}
const mapStateToProps =(state)=>{
    return{
        ingr: state.bgr.ingredients,
        ttlPrice: state.bgr.totalPrice,
        loading: state.ord.loading,
        token: state.auth.token,
        id: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onPurchaseStart: (orderData,token) => dispatch(actionCreators.purchaseStart(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));