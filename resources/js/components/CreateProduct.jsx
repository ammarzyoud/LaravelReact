import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Select from 'react-select';
import swal from 'sweetalert';

function CreateProduct() {
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get('/getSelectCategories').then(res => {
            console.log(res);
            setcategories(res.data.categories);
        });
    }, []);

    return (
        <div className="container">
            <form>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="category">Category</label>
                            <Select
                              isMulti
                              name="category"
                              options={categories}
                              className="basic-multi-select"
                              classNamePrefix="select"
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="price">Price</label>
                            <input type="number" name="price" className="form-control" placeholder="Price" min={1} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="qty">Quantity</label>
                            <input type="number" className="form-control" name="qty" placeholder="Quantity" min={1} />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="image">Image</label>
                            <input type="file" className="form-control" name="image" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" cols="1" rows="1" className="form-control"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default CreateProduct;

if (document.getElementById('createProduct')) {
    const Index = ReactDOM.createRoot(document.getElementById("createProduct"));

    Index.render(
        <React.StrictMode>
            <CreateProduct />
        </React.StrictMode>
    )
}
