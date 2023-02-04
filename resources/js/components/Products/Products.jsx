import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/getProducts').then(res => {
            setProducts(res.data.products);
        });
    }, []);

    const removQty = (id, qty) => {
        if (qty <= 0) {
            swal("Oops!", "Cant Remove quantity is 0 !", "error");
            return;
        }

        axios.post('/removeQty', {
            id,
            qty
        }).then(res => {
            setProducts(res.data.products);
        });
    }

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Discreption</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quatity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, key) =>
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description.slice(0, 35) + (item.description.length > 20 ? " ..." : "")}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button type="button" className="btn btn-danger m-2" onClick={() => removQty(item.id, item.quantity)}>
                                    <i className="bi bi-dash"></i>
                                </button>
                                <a href={"/products/" + item.id} className="btn btn-outline-info m-2">
                                    <i className="bi bi-pen"></i>
                                </a>
                                <button type="button" className="btn btn-outline-danger m-2">
                                    <i className="bi bi-trash3"></i>
                                </button>
                            </td>
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
