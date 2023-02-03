import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";

function DashboardBoxes() {
    const [usersCount, setUsersCount] = useState(0);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        axios.get('/getCounts').then(res => {
            setUsersCount(res.data.usersCount);
            setCategoriesCount(res.data.categoriesCount);
            setProductsCount(res.data.productsCount);
          });
    }, []);


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="dbox dbox--color-1">
                        <div className="dbox__body">
                            <span className="dbox__count">{ usersCount }</span>
                            <span className="dbox__title">Users</span>
                        </div>

                        <div className="dbox__action">
                            <button className="dbox__action__btn">More Info</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dbox dbox--color-2">
                        <div className="dbox__body">
                            <span className="dbox__count">{ categoriesCount }</span>
                            <span className="dbox__title">Categories</span>
                        </div>

                        <div className="dbox__action">
                            <button className="dbox__action__btn">More Info</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="dbox dbox--color-3">
                        <div className="dbox__body">
                            <span className="dbox__count">{ productsCount }</span>
                            <span className="dbox__title">Products</span>
                        </div>

                        <div className="dbox__action">
                            <button className="dbox__action__btn">More Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardBoxes;

if (document.getElementById('dashboardBoxes')) {
    const Index = ReactDOM.createRoot(document.getElementById("dashboardBoxes"));

    Index.render(
        <React.StrictMode>
            <DashboardBoxes />
        </React.StrictMode>
    )
}
