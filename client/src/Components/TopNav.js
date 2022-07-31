import React, { useState } from 'react';
import styles from './topNav.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function TopNav({ setSideNavState, sideNavState }) {

    return (
        <div className={styles.topnav}>
            <FontAwesomeIcon onClick={() => setSideNavState(!sideNavState)} icon={faBars} />
            <h1>freebiesell</h1>
        </div>
    );
}