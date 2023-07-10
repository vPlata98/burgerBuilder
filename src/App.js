import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import { Redirect, Route, Switch } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actionControls from './store/actions/index'
import asyncComponent from './hoc/AsyncComponents/AsyncComponent'
const checkoutAsync = asyncComponent(() => import('./containers/Checkout/Checkout'))
const checkoutOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const checkoutAuth = asyncComponent(() => import('./containers/Auth/Auth'))

class App extends Component {
  
  componentDidMount(){
    this.props.onAuthCheckState()
  }
  
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={checkoutAuth}/>
        <Route path="/" exact component={BurguerBuilder}/>
        <Redirect to='/'/>
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (<Switch>
        <Route path="/checkout" component={checkoutAsync}/>
        <Route path="/auth" component={checkoutAuth}/>
        <Route path="/" exact component={BurguerBuilder}/>
        <Route path="/orders" component={checkoutOrders}/>
        <Route path="/logout" component={Logout}/>
        <Redirect to='/'/>
      </Switch>)
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !==null
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onAuthCheckState: () => dispatch(actionControls.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
