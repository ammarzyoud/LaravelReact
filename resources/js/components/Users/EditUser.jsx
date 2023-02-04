import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function EditUser(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        let user_id = props.user_id;
        axios.get(`/getSingleUser?user_id=${user_id}`).then(res => {
            let user = res.data.user;
            setName(user.name);
            setEmail(user.email);
        });
    }, []);

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);

        axios.post(`/updateUser/${props.user_id}`, formData).then(res => {
            if (res.data.errors) {
                let errors = res.data.errors;
                let msg = "";
                if (errors.name) {
                    msg += errors.name[0] + "\n";
                }
                if (errors.email) {
                    msg += errors.email[0] + "\n";
                }
                swal("Validation Error!", msg, "error");
            } else if (res.status) {
                swal("Success", "User has been updated", "success");
            } 
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name" required value={name} onChange={nameChange} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Email" required value={email} onChange={emailChange} />
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
        </div>
    );
}

export default EditUser;

if (document.getElementById('editUser')) {
    const Index = ReactDOM.createRoot(document.getElementById("editUser"));
    const user_id = document.getElementById('editUser').getAttribute("user_id");

    Index.render(
        <React.StrictMode>
            <EditUser user_id={user_id} />
        </React.StrictMode>
    )
}
