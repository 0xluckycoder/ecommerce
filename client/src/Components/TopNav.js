import React, { useState } from 'react';
import './topNav.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function TopNav({ setSideNavState, sideNavState }) {

    return (
        <div className="topnav">
            <FontAwesomeIcon onClick={() => setSideNavState(!sideNavState)} icon={faBars} />
            <h1>Ecommerce</h1>
        </div>
    );
}