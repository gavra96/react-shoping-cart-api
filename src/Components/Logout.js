import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../Store/actions';

const Logout = props => {
    useEffect(() => {
        props.onLogout();
    }, [props]);

    return (
        <Redirect to="/"/>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.attemptLogout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);