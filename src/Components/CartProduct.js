import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../Store/actions';
import AlertDialog from '../Containers/Alert';


 const CartProduct = props =>{
    const [ howMuch , setHowMuch ] = useState(0);
    const [errorDialog ,setErrorDialog] = useState(false);
    const [message ,setMessage] = useState("");

    const {name, unit, photos, id} = props.product.product;

    const renderPhotos = photos.map(photo => <img key={photo} src={"https://supermarket-test.digitalcube.rs/" + photo} alt="Generic placeholder image" width="150" height="150" className="ml-lg-5 order-1 order-lg-2 rounded"/>);
    return (
        <li className="list-group-item">
        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
             <div className="media-body order-2 order-lg-1">
                <h5 className="mt-0 font-weight-bold mb-2">{name}</h5>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                      
                      <small className="font-weight-bold my-2">Unit: {unit}</small>
                      <small className="font-weight-bold my-2">Amount: {props.product.amount}</small>
                      <small className="font-weight-bold my-2">Price: ${props.product.price}</small>


                      

                </div>
                
                <hr/>
                    <input type="number" className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputTypeSearch"
                    min="1" 
                    value={howMuch}
                    onChange={event => setHowMuch(event.target.value)}
                    />{' '}
                    <Button size="small" variant="contained" color="secondary"
                    onClick={() => {
                        if (howMuch <= 0) {
                            setMessage("Can't remove 0 or less then 0 products to cart.");
                            setErrorDialog(true);
                          } else if (howMuch > props.product.amount) {
                            setMessage(`Can't remove more than ${props.product.amount} products to cart.`);
                            setErrorDialog(true);
                          } else {
                            props.removeFromStore(id, howMuch);
                            setMessage(`Removed ${props.product.amount}.`);
                            setErrorDialog(true);
                          }
                        }}
                    >
                    Remove amount
                    </Button>{' '}
                    <Button size="small" variant="contained" color="secondary"
                    onClick={() => {
                            props.removeFromStore(id, props.product.amount);
                            setMessage("Removed all.");
                            setErrorDialog(true);
                        }}
                    >
                    Remove all
                    </Button>
                    
                
                
                
            </div>{renderPhotos}
        </div><AlertDialog handle={errorDialog} close={()=>{setErrorDialog(false)}} message={message}/>
        </li>
    )
}



const mapDispatchToProps = dispatch => {
    return{
        removeFromStore : (id, amount) => dispatch(actions.removeFromStore(id, amount))
    }
}
export default connect(null, mapDispatchToProps)(CartProduct);

