import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../Shared/utility'
const initialState= {
    ingredients:null,
    totalPrice:4,
    error: false,
    building: false
}
const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
}
const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            console.log(state, action);
            const updatedIngredients = updateObject(state.ingredients, {[action.ingredientName]:state.ingredients[action.ingredientName] + 1})
            const updatedState = updateObject(state,
            {
                ingredients:updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            })
            return updateObject(state,updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredients2 = updateObject(state.ingredients, {[action.ingredientName]:state.ingredients[action.ingredientName] - 1})
            const updatedState2 = updateObject(state,
            {
                ingredients:updatedIngredients2,
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            })
            return updateObject(state,updatedState2)
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: action.ingredients,
                error:false,
                totalPrice:4,
                building: false
            })
                
        case actionTypes.SET_INGREDIENTS_FAILED:
            return updateObject(state,{error:true})
        default:
            return state;
    }
}

export  default reducer;