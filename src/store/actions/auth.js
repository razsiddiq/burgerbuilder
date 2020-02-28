import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) =>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId :userId
    }
}


export const authFail= (error) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth = (email, password, isSignup) =>{
   return dispatch => {
       dispatch(authStart());

       const userData = {
           email : email,
           password: password,
           returnSecureToken : true
       }

       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKOuAg0iw78SceiYzVEAZvrRUWjLCzDmg';
       if(!isSignup){
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKOuAg0iw78SceiYzVEAZvrRUWjLCzDmg';
       }

       axios.post(url,userData)
            .then(response =>{
                console.log(response);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));

            })

   }
}