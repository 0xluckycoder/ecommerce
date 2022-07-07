import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Home from './Home';
import Orders from './Orders';
import Products from './Products';
import Customers from './Customers';

import './sellerDashboard.scss';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function SellerDashboard() {
    const [sideNavState , setSideNavState] = useState(false);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === '/') {
            navigate('/dashboard', {replace: true});
        }
    }, []);

    return (
        <div className="dashboard">
            <TopNav sideNavState={sideNavState} setSideNavState={setSideNavState} />
            <div className="content-wrapper">
                <SideNav sideNavState={sideNavState} />
                <Routes>
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/customers" element={<Customers />} />
                </Routes>
            </div>
        </div>
    );
}
