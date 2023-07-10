import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios.orders'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from '../../store/actions/index'
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrdersStart(this.props.token,this.props.id)
    }
    render(){
        let orders = <Spinner/> 
        if (!this.props.loading) {
            orders = this.props.orders.map(
                        (order) => {
                            return <Order 
                            ingredients={order.ingredients}
                            price={+order.price}
                            key={order.id}/>
                        }
                    )
        }
        return(
            <div>
                {orders}
            </div>
            
            
        );
    }
}
const mapStateToProps = (state) =>{
    return{
        orders: state.ord.orders,
        loading: state.ord.loading,
        token: state.auth.token,
        id: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onFetchOrdersStart: (token,id) => dispatch(actionTypes.fetchOrdersStart(token,id))
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));