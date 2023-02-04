import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function EditCategory(props) {
    const [name, setName] = useState('');

    useEffect(() => {
        let category_id = props.category_id;
        axios.get(`/getSingleCategory?category_id=${category_id}`).then(res => {
            let category = res.data.category;
            setName(category.name);
        });
    }, []);

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = () => {
        if (name == '') {
            swal("Validation Error!", "Name field is required", "error");
        }
        let formData = new FormData();
        formData.append("name", name);

        axios.post(`/updateCategory/${props.category_id}`, formData).then(res => {
            console.log(res);
            if (res.status) {
                swal("Success", "Category has been updated", "success");
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

export default EditCategory;

if (document.getElementById('editCategory')) {
    const Index = ReactDOM.createRoot(document.getElementById("editCategory"));
    const category_id = document.getElementById('editCategory').getAttribute("category_id");
    Index.render(
        <React.StrictMode>
            <EditCategory category_id={category_id} />
        </React.StrictMode>
    )
}
