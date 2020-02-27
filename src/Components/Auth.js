import React, { useState } from 'react';
import * as actions from '../Store/actions';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
 
const Auth = props => {
    const [email ,setEmail] = useState('');
    const [password ,setPassword] = useState('');

    
    const submitLoginHandler = event => {
        event.preventDefault();
        props.onAuth(email, password);
    }

    return(
        <div>
        <Dialog open={props.handleAuth} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
            
                {props.errorMessage }
                {props.isAuthenticated? props.close() : null}
                <form onSubmit={submitLoginHandler} className="form-wrapper">
                    
                    <TextField type="text" 
                        className="form-control" 
                        placeholder="Your username"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    <TextField type="password"
                        className="form-control"
                        placeholder="Your password"
                        value={password}
                        onChange={event => setPassword(event.target.value)} 
                    />
                    <Button onClick={props.close} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit">Login </Button>
                </form>
            </DialogContent>       
        </Dialog> 
        </div> 
);
}


const mapStateToProps = state => {
    return {
        errorMessage : state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth : (email, password) => dispatch(actions.auth(email,password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

