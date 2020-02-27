import React from 'react';
import {withRouter} from 'react-router-dom';
import Navigation from '../Components/Navigation';
import Container from '@material-ui/core/Container';

const layout = props => {

  return (
    <Container maxWidth="lg">
        <br/>
        <Navigation/>
        <section className="section wb">
            <div className="container">
                <div className="row">

                    {props.children}
                    
                    
                </div>
            </div>
        </section>
    </Container>
  );
};


export default withRouter(layout);
