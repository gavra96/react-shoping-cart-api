import * as actionTypes from './actionTypes';
import axios from 'axios'; 

export const storeCart= id => {
    return {
        type : actionTypes.STORE_CART,
        cartId : id
    };
};

export const removeCart= () => {
    return {
        type : actionTypes.DELETE_CART
    };
};

export const createStore = () => {
    return dispatch => {
        const user = localStorage.getItem('token');
        axios.put('https://supermarket-test.digitalcube.rs/api/cart', null, {
            Accept : 'application/json',
            headers: {
            Authorization:  user
            }
        }).then(response => {
            dispatch(storeCart(response.data.id))
        }).catch(error => {
            
        });
    }
}

export const deleteCart = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        axios.delete('https://supermarket-test.digitalcube.rs/api/cart',{
            headers: {
            Authorization: token
            }
        }).then(response => {
            dispatch(removeCart());
            dispatch(createStore());
        }).catch(error => {
            
        });
    }
}

export const addToStore = (id , amount) => {
    return (dispatch, getState) => {
        const user = localStorage.getItem('token');
        const cartData = {
            action : "add",
            id_product : id,
            amount
        }

        axios.patch('https://supermarket-test.digitalcube.rs/api/cart', JSON.stringify(cartData),
          {
            headers: {
//              'Content-Type': 'application/json'
//            'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:  user
            }
          }
        )
        .then(response => {
            dispatch(getCartItems());
        }).catch(error => {
            console.log(error)
        });
    }
}

export const getCartItems = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        axios.get('https://supermarket-test.digitalcube.rs/api/cart', {
             headers: {
             Authorization: token
             }
         }).then(response => {
              //console.log(response);
              const { status , price, items} = response.data;
              dispatch(updateCart(status,price,items));
          }).catch(error => {
              console.log(error);
          });
            
    }
}

export const updateCart= (status, price, items) => {
    return {
        type : actionTypes.UPDATE_CART,
        status,
        price,
        items
    };
};

export const removeFromStore = (id , amount) => {
    return (dispatch, getState) => {
        const user = localStorage.getItem('token');
        const cartData = {
            action : "remove",
            id_product : id,
            amount
        }

        axios.patch('https://supermarket-test.digitalcube.rs/api/cart', JSON.stringify(cartData),
          {
            headers: {
//              'Content-Type': 'application/json'
//            'Content-Type': 'multipart/form-data'
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:  user
            }
          }
        )
        .then(response => {
            dispatch(getCartItems());
        }).catch(error => {
            console.log(error)
        });
    }
}