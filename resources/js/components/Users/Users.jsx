import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/getUsers').then(res => {
            setUsers(res.data.users);
        });
    }, []);

    const deleteUser = (id) => {
        swal({
            title: "Are you sure ??",
            text: "You will not be able to recover this User!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            confirmDelete(id);
          }
        });
    }

    const confirmDelete = (id) => {
        axios.delete(`/users/${id}`, {
            id,
        }).then(res => {
            console.log(res);
            if (res.status) {
                swal("Deleted!", "User has been deleted.", "success");
                setUsers(res.data.users);
            }
        });
    }

    return (
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, key) =>
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <a href={"/users/" + item.id} className="btn btn-outline-info m-2">
                                    <i className="bi bi-pen"></i>
                                </a>
                                <button onClick={() => deleteUser(item.id)} className="btn btn-outline-danger m-2">
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

export default Users;

if (document.getElementById('usersTable')) {
    const Index = ReactDOM.createRoot(document.getElementById("usersTable"));

    Index.render(
        <React.StrictMode>
            <Users />
        </React.StrictMode>
    )
}
