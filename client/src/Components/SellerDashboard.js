import React, { useState } from 'react';
import './sellerDashboard.scss';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Home from './Home';

export default function SellerDashboard() {
    const [sideNavState , setSideNavState] = useState(false);

    return (
        <div className="dashboard">
            <TopNav sideNavState={sideNavState} setSideNavState={setSideNavState} />
            <div className="content-wrapper">
                <SideNav sideNavState={sideNavState} />
                <Home />
            </div>
        </div>
    );
}