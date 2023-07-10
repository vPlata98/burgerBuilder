import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../Shared/utility'
const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPatch:'/'
}
const reducer = (state=initialState,action) =>{
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state,{token: action.idToken, userId: action.userId,
                error:null,loading:false})
        case actionTypes.AUTH_INIT:
            return updateObject(state,{error:null,loading:true})
        case actionTypes.AUTH_FAILED:
            return updateObject(state,{error:action.error,loading:false})
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state,{userId:null,token:null})
        case actionTypes.AUTH_SET_URL:
            return updateObject(state,{authRedirectPatch: action.authRedirectPatch})
        default:
            return state;
    }
}

export default reducer