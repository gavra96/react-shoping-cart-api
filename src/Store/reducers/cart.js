import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    cartId: null,
    price: 0,
    status: null,
    products: []
};


const createCart = (state, action) => {
    return updateObject( state, { cartId : action.cartId  } );
};
const removeCart = (state, action) => {
    return updateObject(state, { cartId : null, price : 0, status : null, products : [] });
};

export const updateCart= (state, action) => {
    return updateObject(state, { status : action.status, price: action.price, products : action.items});
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.STORE_CART : return createCart(state, action);
        case actionTypes.DELETE_CART : return removeCart(state, action);
        case actionTypes.UPDATE_CART : return updateCart(state, action);

        default : return state; 
    }
};

export default reducer;