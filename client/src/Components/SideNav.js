import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTag, faBoxArchive, faUser, faGear } from '@fortawesome/free-solid-svg-icons';
import styles from './sideNav.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SideNav({ sideNavState }) {

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        navigate(path);
    }

    return (
        <div className={`${styles.sideNav} ${sideNavState && styles.sideNavShow}`}>
            <div onClick={() => handleNavClick('/vendor/dashboard')} className={`${styles.sideNavItem} ${pathname === '/dashboard' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faHouse} />
                <p>Home</p>
            </div>

            <div onClick={() => handleNavClick('/vendor/orders')} className={`${styles.sideNavItem} ${pathname === '/orders' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faTag} />
                <p>Orders</p>
            </div>

            <div onClick={() => handleNavClick('/vendor/products')} className={`${styles.sideNavItem} ${pathname === '/products' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faBoxArchive} />
                <p>Products</p>
            </div>

            <div onClick={() => handleNavClick('/vendor/customers')} className={`${styles.sideNavItem} ${pathname === '/customers' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faUser} />
                <p>Customers</p>
            </div>

            <div onClick={() => handleNavClick('/vendor/settings')} className={`${styles.sideNavItem} ${pathname === '/settings' && styles.sideNavActiveItem}`}>
                <FontAwesomeIcon icon={faGear} />
                <p>Settings</p>
            </div>
        </div>
    );
}