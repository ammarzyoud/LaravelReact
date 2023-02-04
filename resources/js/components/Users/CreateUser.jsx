import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const passwordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    }

    const handleSubmit = () => {
        if (name == '') {
            swal("Validation Error!", "Name field is required", "error");
            return;
        }
        let formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("password_confirmation", password_confirmation);

        axios.post('/users', formData).then(res => {
            if (res.data.errors) {
                let errors = res.data.errors;
                let msg = "";
                if (errors.name) {
                    msg += errors.name[0] + "\n";
                }
                if (errors.email) {
                    msg += errors.email[0] + "\n";
                }
                if (errors.password) {
                    msg += errors.password[0];
                }
                swal("Validation Error!", msg, "error");
            } else if (res.status) {
                swal("Success", "User has been created", "success");
                setName('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');
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
            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="name">Password</label>
                        <input id="password" type="password" className="form-control" name="password" required value={password} onChange={passwordChange} placeholder="Password" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="password_confirmation" type="password" className="form-control" name="password_confirmation" required value={password_confirmation} onChange={passwordConfirmationChange} placeholder="Password Confirmation" />
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit</button>
        </div>
    );
}

export default CreateUser;

if (document.getElementById('createUser')) {
    const Index = ReactDOM.createRoot(document.getElementById("createUser"));

    Index.render(
        <React.StrictMode>
            <CreateUser />
        </React.StrictMode>
    )
}
