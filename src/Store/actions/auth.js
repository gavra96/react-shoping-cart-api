import * as actionTypes from './actionTypes';
import axios from 'axios';
import { createStore, getCartItems } from './cart';


export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    };
};

export const authSuccess = token => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token : token
    };
};

export const storeUser = user => {
    return {
        type : actionTypes.STORE_USER,
        user : user
    };
};

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    return {
        type : actionTypes.AUTH_LOGOUT
    };
};

export const attemptLogout = () => {
    return dispatch => {
    const user = localStorage.getItem('token');
    if(user){
        axios.post('https://supermarket-test.digitalcube.rs/user/logout', null, {
            Accept : 'application/json',
            headers: {
            Authorization:  user
            }
        }).then(response => {
            dispatch(logout());
        }).catch(error => {
            dispatch(authFail(error.response.data.message));
        });

        }
    }
}


// auto login if reload page
export const authAttempt = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if(token){
                axios.get('https://supermarket-test.digitalcube.rs/user/login', {
                    headers: {
                    Authorization: token
                    }
                }).then(response => {
                    //console.log(response);
                    dispatch(authSuccess(token));
                    dispatch(storeUser(response.data));
                }).catch(error => {
                    console.log(error);
                });
            }else{
                dispatch(logout());
            }
    }
}




export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username,
            password
        };
        
        axios.post('https://supermarket-test.digitalcube.rs/user/login', JSON.stringify(authData),
          {
            headers: {
//              'Content-Type': 'application/json'
//            'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(response => {
            //console.log(response);
            localStorage.setItem('token', response.data.token);
            dispatch(authSuccess(response.data.token));
            dispatch(authAttempt());
            dispatch(createStore());
            dispatch(getCartItems());


        }).catch(error => {
            dispatch(authFail(error.response.data.message));
        });
    };
};