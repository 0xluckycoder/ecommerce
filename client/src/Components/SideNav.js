import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTag, faBoxArchive, faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './sideNav.module.scss';
import { useLocation } from 'react-router-dom';

export default function SideNav({ sideNavState }) {

    const { pathname } = useLocation();

    return (
        <div className={`${styles.sideNav} ${sideNavState && styles.sideNavShow}`}>
            <div className={`${styles.sideNavItem} ${pathname === '/dashboard' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faHouse} />
                <p>home</p>
            </div>
            <div className={`${styles.sideNavItem} ${pathname === '/orders' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faTag} />
                <p>orders</p>
            </div>
            <div className={styles.sideNavItem}>
                <FontAwesomeIcon icon={faBoxArchive} />
                <p>products</p>
            </div>
            <div className={styles.sideNavItem}>
                <FontAwesomeIcon icon={faUser} />
                <p>Customers</p>
            </div>
            <div className={styles.sideNavItem}>
                <FontAwesomeIcon icon={faGear} />
                <p>Settings</p>
            </div>
        </div>
    );
}