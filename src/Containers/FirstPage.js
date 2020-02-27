import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../Components/Product';

const FirstPage = React.memo(props => {

    const [ products , setProducts ] = useState([]);
    const [ page , setPage ] = useState(null);

    const getProducts = () => axios.get('https://supermarket-test.digitalcube.rs/api/products', null, {
        Accept : 'application/json'
    }).then(response => {
        //console.log(response);
         setProducts(response.data.items);
         
    }).catch(error => {
        console.log(error);
    });

    useEffect(()=>{
        getProducts();
    }, []);



    
    const renderProducts = products.map(product => {
        return <Product key={product.id} product={product} update={getProducts}/>
    });

    return (
        <div className="container py-5">
            <div className="row text-center text-white mb-5">
                <div className="col-lg-8 mx-auto">
                    <h1 className="display-4">Product List</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <ul className="list-group shadow">
                            {renderProducts}
                    </ul> 
                </div>
            </div>
        </div>
    );
});
export default FirstPage;