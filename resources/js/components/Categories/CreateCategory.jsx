import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function CreateCategory() {
    const [name, setName] = useState('');

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        if (name == '') {
            swal("Validation Error!", "Name field is required", "error");
        } 
        let formData = new FormData();
        formData.append("name", name);

        axios.post('/categories', formData).then(res => {
            if (res.status) {
                swal("Success", "Category has been created", "success");
                setName('');
            }
        });
    }

    return (
        <div className="container">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" name="name" placeholder="Name" value={name} onChange={nameChange} />
            </div>
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
        </div>
    );
}

export default CreateCategory;

if (document.getElementById('createCategory')) {
    const Index = ReactDOM.createRoot(document.getElementById("createCategory"));

    Index.render(
        <React.StrictMode>
            <CreateCategory />
        </React.StrictMode>
    )
}
