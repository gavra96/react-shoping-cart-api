import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Auth from './Auth';
const Navigation = props => {
    
    const [authDialog ,setAuthDialog] = useState(false);

    useEffect(()=>{

    }, [props.isAuthenticated])


    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light rounded" >
        <a className="navbar-brand">Welcome</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
                <NavLink className="nav-link" to="/">Home <span className="sr-only"></span></NavLink>
            </li>
            {!props.isAuthenticated
                 ? 
                 <li className="page-item">
                     <NavLink to="" className="nav-link" onClick={() => {setAuthDialog(true)}}>Login</NavLink>
                 </li>
                    
                 : <>
                 <li className="nav-item">
                 <NavLink 
                 to="/logout" 
                 className="nav-link"
                 >Logout</NavLink>
                 </li>
                 <li className="nav-item">
                 <NavLink 
                 to="/cart" 
                 className="nav-link"
                 >Cart</NavLink>
                 </li>
                 </>             
            }
            <Auth handleAuth={authDialog} close={()=>{setAuthDialog(false)}}></Auth>

          </ul>
        </div>
      </nav>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
  }
  
export default connect(mapStateToProps, null)(Navigation);
