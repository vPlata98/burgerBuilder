import * as actionTypes from './actionTypes'
import axios from '../../axios.orders'
export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id:id,
        orderData:orderData
    }
}


export const purchaseBurgerFailed = (error) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchasingBurger = () =>{
    return{
        type: actionTypes.PURCHASING_BURGER
    }
}


export const purchaseStart = (orderData, token) =>{
    return dispatch =>{
        dispatch(purchasingBurger())
        axios.post('/orders.json?auth='+token,orderData).then(
            (response) => dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        )
        .catch(
            (error) => dispatch(purchaseBurgerFailed(error))
            
        )
    }
}

export const purchaseInit = () =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersInit = () =>{
    return {
        type: actionTypes.FETCH_ORDERS_INIT
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFailed = (err) =>{
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error:err
    }
}

export const fetchOrdersStart = (token,id) =>{
    return dispatch => {
        dispatch(fetchOrdersInit())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + id +'"'
        axios.get('/orders.json'+queryParams)
        .then(
            (response) =>{
                const fetchOrders = []
                for(let param in response.data){
                    fetchOrders.push({
                        ...response.data[param],
                        id: param
                    })
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
            }
        )
        .catch(
            (err)=>{
                dispatch(fetchOrdersFailed(err))
            }
        )
    }
}