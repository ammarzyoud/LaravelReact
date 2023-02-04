import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Select from 'react-select';
import swal from 'sweetalert';

function EditProduct() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [product_categorie, setProductCategories] = useState([]);
    const [price, setPrice] = useState(1);
    const [qty, setQty] = useState(1);
    const [image, setImage] = useState();
    const [imageKey, setImageKey] = useState();
    
    useEffect(() => {
        axios.get('/getSelectCategories').then(res => {
            setCategories(res.data.categories);
        });
    }, []);

    const nameChange = (e) => {
        setName(e.target.value);
    }
    
    const categoryChange = (e) => {
        setProductCategories(e);
    }

    const priceChange = (e) => {
        setPrice(e.target.value)
    }

    const qtyChange = (e) => {
        setQty(e.target.value);
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const imageChange = (e) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
          }
    }

    const handleSubmit = () => {
        if (name == '') {
            swal("Validation Error!", "Name field is required", "error");
        } else if (product_categorie.length == 0) {
            swal("Validation Error!", "You should select one Category or more", "error");
        } else if (price <= 0) {
            swal("Validation Error!", "Price should be more than 0", "error");
        } else if (qty <= 0) {
            swal("Validation Error!", "Quantity should be more than 0", "error");
        }
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("qty", qty);
        product_categorie.forEach(category => formData.append('categories[]', category.value))
        if (image) {
            formData.append("file", image);
        }

        axios.post('/products', formData).then(res => {
            if (res.status) {
                swal("Success", "Product has been created", "success");

                setName('');
                setProductCategories([]);
                setPrice(1);
                setQty(1);
                setDescription('');
                setImage('');
                setImageKey(Math.random().toString(36));
            }
        });
    }

    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={nameChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <Select
                            isMulti
                            name="category"
                            options={categories}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={categoryChange}
                            value={product_categorie || ''}
                        />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" className="form-control" placeholder="Price" min={1} value={price} onChange={priceChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="qty">Quantity</label>
                        <input type="number" className="form-control" name="qty" placeholder="Quantity" min={1} value={qty} onChange={qtyChange} />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input type="file" className="form-control" name="image" onChange={imageChange} key={imageKey} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" cols="1" rows="1" className="form-control" value={description} onChange={descriptionChange}></textarea>
                    </div>
                </div>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
        </div>
    );
}

export default EditProduct;

if (document.getElementById('editProduct')) {
    const Index = ReactDOM.createRoot(document.getElementById("editProduct"));

    Index.render(
        <React.StrictMode>
            <EditProduct />
        </React.StrictMode>
    )
}
