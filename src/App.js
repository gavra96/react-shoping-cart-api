import React, { Suspense, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Layout from './Containers/Layout';
import FirstPage from './Containers/FirstPage';
import { connect } from 'react-redux';
import * as actions from './Store/actions';

const Logout = React.lazy(()=> {
  return import('./Components/Logout');
});

const Cart = React.lazy(()=> {
  return import('./Components/Cart');
});


const App = props => {


  useEffect( ()=>{
    props.authAttempt();
    props.getCart();
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={FirstPage} />
      <Redirect to="/" />
    </Switch>
  );
  
  if ( props.isAuthenticated ) {
    routes = (
      <Switch>
        <Route path="/logout" render={() => <Logout />} />
        <Route path="/cart" render={() => <Cart />} />

        <Route path="/" exact component={FirstPage} />
        <Redirect to="/" />
      </Switch>
    );
  }
  
 
  return (
    
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    

  );
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    authAttempt : () => dispatch(actions.authAttempt()),
    getCart : () => dispatch(actions.getCartItems())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
