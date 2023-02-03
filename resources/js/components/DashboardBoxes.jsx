import React from 'react';
import ReactDOM from 'react-dom/client';

function DashboardBoxes() {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="dbox dbox--color-1">
                        <div class="dbox__body">
                            {/* <span class="dbox__count">{{ $usersCount }}</span> */}
                            <span class="dbox__title">Users</span>
                        </div>

                        <div class="dbox__action">
                            <button class="dbox__action__btn">More Info</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dbox dbox--color-2">
                        <div class="dbox__body">
                            {/* <span class="dbox__count">{{ $categoriesCount }}</span> */}
                            <span class="dbox__title">Categories</span>
                        </div>

                        <div class="dbox__action">
                            <button class="dbox__action__btn">More Info</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="dbox dbox--color-3">
                        <div class="dbox__body">
                            {/* <span class="dbox__count">{{ $productsCount }}</span> */}
                            <span class="dbox__title">Products</span>
                        </div>

                        <div class="dbox__action">
                            <button class="dbox__action__btn">More Info</button>
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
