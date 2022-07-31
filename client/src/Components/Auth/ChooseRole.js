import React from 'react';
import styles from './chooseRole.module.scss';
import { Button } from 'antd';
import trolley from '../../assets/trolley.svg';
import store from '../../assets/store.svg';

/*
- create seperate top navigation bar without hamburger menu called (topnavBrand) and use it in authenticate pages as a topnavbar
- create a parent page for grey background with a centered box
*/ 

export default function ChooseRole() {
    return (
        <div className='grey-background'>
            <div className='brand-top-nav'>
                <h1>freebiesell</h1>
            </div>

            <div className={styles.centerBox}>
                <h2>Join as a vendor or buyer</h2>

                <div className={styles.selectItems}>
                    <SelectItem text="Join as a vendor" icon={store} />
                    <SelectItem text="Join as a buyer" icon={trolley} />
                </div>

                <Button className="themed-btn">Next</Button>
            </div>

        </div>
    );
}

function SelectItem({ text, icon }) {
    return (
        <div className={styles.selectItem}>
            <img src={icon} />
            <p>{text}</p>
        </div>
    );
}