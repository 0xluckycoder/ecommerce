import React, { useState } from "react"
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';
import './vendorPage.scss';

import SideNav from '../SideNav';
import TopNav from '../TopNav';

import Home from './Home';

export default function VendorPage() {

    const [sideNavState , setSideNavState] = useState(false);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
    <div className="dashboard">
        <TopNav sideNavState={sideNavState} setSideNavState={setSideNavState} />
        <div className="content-wrapper">
            <SideNav sideNavState={sideNavState} />
            <Outlet />
        </div>
    </div>
    )
}