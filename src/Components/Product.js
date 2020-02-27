import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as actions from '../Store/actions';
import AlertDialog from '../Containers/Alert';


 const Product = props =>{
    const [ howMuch , setHowMuch ] = useState(0);
    const [errorDialog ,setErrorDialog] = useState(false);
    const [message ,setMessage] = useState("");

    const {name, category, unit, price, reserved , available, photos, id} = props.product;

    const renderPhotos = photos.map(photo => <img key={photo} src={"https://supermarket-test.digitalcube.rs/" + photo} alt="Generic placeholder image" width="150" height="150" className="ml-lg-5 order-1 order-lg-2 rounded"/>);
    return (
        <li className="list-group-item">
        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
             <div className="media-body order-2 order-lg-1">
                <h5 className="mt-0 font-weight-bold mb-2">{name}</h5>
                <p className="font-italic text-muted mb-0 small">Category: {category}</p>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                      <small className="font-weight-bold my-2">Price: ${price}</small>
                      <small className="font-weight-bold my-2">Available: {available}</small>
                      <small className="font-weight-bold my-2">Unit: {unit}</small>
                      <small className="font-weight-bold my-2">reserved: {reserved}</small>

                </div>
                
                {
                    props.isAuthenticated ? <><hr/>
                    <input type="number" className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputTypeSearch"
                    min="1" max={available-reserved}
                    value={howMuch}
                    onChange={event => setHowMuch(event.target.value)}
                    />{' '}
                    <Button size="small" variant="contained" color="primary"
                    onClick={() => {
                        if(howMuch <= 0 ){
                            
                            setMessage("Can't add 0 or less then 0 products to cart.");
                            setErrorDialog(true);
                        }else if (howMuch > available) {
                            setMessage(`Can't add more than ${available} products to cart.`);
                            setErrorDialog(true);
                        }else{
                            props.addToStore(id, howMuch) 
                            setMessage("Added.");
                            setErrorDialog(true);
                            props.update();
                        }}

                        }
                    >
                    Add to cart
                    </Button>{' '}
                    </> : 
                    null
                }
                
                
                
            </div>{renderPhotos}
        </div><AlertDialog handle={errorDialog} close={()=>{setErrorDialog(false)}} message={message}/>
        </li>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return{
      addToStore : (id, amount) => dispatch(actions.addToStore(id, amount))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);

