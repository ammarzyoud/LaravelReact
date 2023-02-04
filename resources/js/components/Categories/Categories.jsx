import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";
import swal from 'sweetalert';

function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/getCategories').then(res => {
            setCategories(res.data.categories);
        });
    }, []);

    const deleteCategory = (id, productsLen) => {
        if (productsLen) {
            swal("Oops!", "Cant Delete this category there are products assigned to it", "error");
            return;
        }
        console.log(productsLen);
        swal({
            title: "Are you sure ??",
            text: "You will not be able to recover this Category!",
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
        axios.delete(`/categories/${id}`, {
            id,
        }).then(res => {
            console.log(res);
            if (res.status) {
                swal("Deleted!", "Category has been deleted.", "success");
                setCategories(res.data.categories);
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
                        <th scope="col">Number of products</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item, key) =>
                        <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.products.length}</td>
                            <td>
                                <a href={"/categories/" + item.id} className="btn btn-outline-info m-2">
                                    <i className="bi bi-pen"></i>
                                </a>
                                <button onClick={() => deleteCategory(item.id, item.products.length)} className="btn btn-outline-danger m-2">
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

export default Categories;

if (document.getElementById('categoriesTable')) {
    const Index = ReactDOM.createRoot(document.getElementById("categoriesTable"));

    Index.render(
        <React.StrictMode>
            <Categories />
        </React.StrictMode>
    )
}
