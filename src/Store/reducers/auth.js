import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    token : null,
    loading : false,
    error : null,
    user : null
};

const authStart = ( state, action ) => {
    return updateObject( state, { error : null, loading : true } );
}

const authSuccess = ( state, action ) => {
    return updateObject( state, { token : action.token , loading : false } );
}

const authFail = ( state, action ) => {
    return updateObject( state, { error : action.error, loading : false } ); 
}

const authLogout = (state, action) => {
    return updateObject(state, { token: null, user : null });
};

const storeUser = (state, action) => {
    return updateObject(state, { user : action.user });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state, action);
        case actionTypes.AUTH_SUCCESS : return authSuccess(state, action);
        case actionTypes.AUTH_FAIL : return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.STORE_USER: return storeUser(state, action);

        default : return state; 
    }
};

export default reducer;