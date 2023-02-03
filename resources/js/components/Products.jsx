import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/getProducts').then(res => {
            console.log(res);
            setProducts(res.data.products);
        });
    }, []);


    return (
        <div className="container">
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Discreption</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quatity</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item,key) => 
                    <tr key={key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description.slice(0, 35) + (item.description.length > 20 ? " ..." : "")}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    );
}

export default Products;

if (document.getElementById('productsTable')) {
    const Index = ReactDOM.createRoot(document.getElementById("productsTable"));

    Index.render(
        <React.StrictMode>
            <Products />
        </React.StrictMode>
    )
}
