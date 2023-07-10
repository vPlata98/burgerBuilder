import React, { Component } from "react";
import classes from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actionControls from '../../store/actions/index'
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

import {checkValidity} from '../../Shared/utility'

class Auth extends Component{
    state = {
        userForm:{
            email:{
                elementType:'input',
                elementConfig:{
                    type: 'email',
                    placeholder:'Your email'
                },
                value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched: false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type: 'password',
                    placeholder:'Your password'
                },
                value:'',
                validation: {
                    required:true,
                    minLength: 7
                },
                valid:false,
                touched: false
            }
        },
        isSignup: true
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.userForm,
            [controlName]: {
                ...this.state.userForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,this.state.userForm[controlName].validation),
                touched: true
            }
        };
        this.setState({userForm: updatedControls});
    }
    signupHandler = ()=>{
        this.setState(
            (prevState) => { return {isSignup: !prevState.isSignup}}
        )
    }
    
    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuthStart(this.state.userForm.email.value,
            this.state.userForm.password.value, this.state.isSignup)
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirectPatch !== '/'){
            this.props.onAuthSetUrl()
        }
    }
    render(){
        const formElement = []
        
        for(let param in this.state.userForm){
            formElement.push({
                id: param,
                config: this.state.userForm[param]
            })
        }
        
        let form = (
            <form onSubmit={this.submitHandler}>
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
                btnType="Success">SUBMIT </Button>
            </form>
        
            
    )
        if (this.props.loading) {
            form = <Spinner/>
        }
        let error = null
        if(this.props.error){
            error = <p>{this.props.error.message}</p>
        }
        let redirect = null
        if(this.props.isAuthenticated){
            redirect = <Redirect to={this.props.authRedirectPatch}/>
        }
        return(
            <div className={classes.Auth}>
                {redirect}
                {error}
                {form}
                <Button
                clicked={this.signupHandler}
                btnType="Danger">{this.state.isSignup ? 'SIGN IN' : 'SIGNUP'} </Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.bgr.building,
        authRedirectPatch: state.auth.authRedirectPatch
    }
}
const mapDispatchToProps = dispacth =>{
    return{
        onAuthStart: (email,password, isSignup) => dispacth(actionControls.authStart(email,password,isSignup)),
        onAuthSetUrl: () => dispacth(actionControls.authSetUrl('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth); 