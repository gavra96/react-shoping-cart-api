import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Store/actions';
import Button from '@material-ui/core/Button';
import CartProduct from './CartProduct';
import CheckOutDialog from '../Containers/CheckOutDialog';



const Cart = props => {
    const [checkOutDialog , setCheckOutDialog] = useState(false);

    useEffect(()=>{
        props.getCartItems();
    },[]);

    const renderProducts = props.products.map(product => {
        return <CartProduct key={product.product.id} product={product} />
    });

    const renderCheckOutList = props.products.map(product => {
    return <li key={product.product.id}  className="list-group-item">{product.product.name + ' x ' + product.amount}</li>
    });

    return(
        <div className="container py-5">
            <div className="row text-center text-white mb-5">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-4">Cart List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <ul className="list-group shadow">
                    <li className="list-group-item">
                        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                        <div className="media-body order-2 order-lg-1">
                        <p className="font-italic text-muted mb-0 small">Cart status: {props.status}</p>
                        <div className="d-flex align-items-center justify-content-between mt-1">
                            <small className="font-weight-bold my-2">Total price: ${props.price}</small>
                            
                        </div>
                        
                        </div>
                        </div>
                        <Button size="small" variant="contained" color="primary"
                        onClick={() => props.deleteCart()}
                        >
                            Delete cart
                        </Button>
                        <hr/>
                        
                        <h5 className="mt-0 font-weight-bold mb-2">Products in cart:</h5>
                        

                    </li>
                    </ul> <br/>
                    <ul className="list-group shadow">
                    
                    {renderProducts}

                    {props.products.length > 0 ?
                    <Button size="small" variant="contained" color="primary"
                        onClick={() => setCheckOutDialog(true)}
                        >
                            Continue to checkout 
                    </Button>
                    : null
                    }
                    </ul>
                    <CheckOutDialog handle={checkOutDialog} close={() => setCheckOutDialog(false)} title="Are you sure you want to buy">
                    <ul className="list-group">
                        {renderCheckOutList}
                    </ul>
                    </CheckOutDialog>
                    

                    
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        products : state.cart.products,
        status : state.cart.status,
        price : state.cart.price,

    }
}

const mapDispatchToProps = dispatch => {
    return{
      addToStore : (id, amount) => dispatch(actions.addToStore(id, amount)),
      getCartItems : () => dispatch(actions.getCartItems()),
      deleteCart : () => dispatch(actions.deleteCart()),
      //removeFromStore : (id, amount) => dispatch(actions.addToStore(id, amount))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
