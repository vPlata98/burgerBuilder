import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess = (token, id) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id 
    }
}

export const authFailed = (error) =>{
    return {
        type: actionTypes.AUTH_FAILED,
        error:error
    }
}


export const authInit = () =>{
    return {
        type: actionTypes.AUTH_INIT
    }
}


export const authStart= (email, password,isSignup) =>{
    return dispatch => {
        dispatch(authInit())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDE5L19s_tZ75m9vn1inRbp7s6gHaASlz0'
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDE5L19s_tZ75m9vn1inRbp7s6gHaASlz0'
        }
        axios.post(url,authData)
        .then(
            (response) => {
                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token',response.data.idToken)
                localStorage.setItem('expirationTime',expirationTime)
                localStorage.setItem('id',response.data.localId)
                dispatch(authSuccess(response.data.idToken,
                    response.data.localId))
                dispatch(checkAuthTime(response.data.expiresIn))
            }
        )
        .catch(
            (error)=> {
                dispatch(authFailed(error.response.data.error))}
        )
    }
}
export const authLogout =() =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('id')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTime = (expireTime) =>{
    const time = expireTime * 1000
    return dispatch => {
        setTimeout( () =>
            dispatch(authLogout())
        ,time)
    }
}

export const authSetUrl =(path) =>{
    return {
        type: actionTypes.AUTH_SET_URL,
        authRedirectPatch:path
    }
}

export const authCheckState = () =>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        }else{
            const expirationTime = new Date(localStorage.getItem('expirationTime'))
            if(expirationTime > new Date()){
                dispatch(authSuccess(token,localStorage.getItem('id')))
                dispatch(checkAuthTime((expirationTime.getTime() - new Date().getTime())/1000))
            }else{
                dispatch(authLogout());
                
            }
        }
    }
}