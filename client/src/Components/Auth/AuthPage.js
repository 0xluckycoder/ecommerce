import React from 'react';
import styles from './AuthPage.module.scss';
import trolley from '../../assets/trolley.svg';
import store from '../../assets/store.svg';
import googleIcon from '../../assets/google-icon.svg';
import TopNav from '../TopNav';
import { Input, Button } from 'antd';

/*
- [x] - create seperate top navigation bar without hamburger menu called (topnavBrand) and use it in authenticate pages as a topnavbar
- [x] - create a parent page for grey background with a centered box
- [x] - create a grey page wrapper
- [x] - try to include both signin and signup pages in this component
- [x] - make the page mobile firendly
- [ ] - create a flow and link all components accordingly
- [ ] - add validation to form fields
*/

export default function AuthPage() {
    return (
        <GreyBackground>

            <TopNav hideHamburger={true} />

            {/* <SignIn /> */}

            <SignUp />

            {/* <div className={styles.centerBox}>
                <h2>Join as a vendor or buyer</h2>

                <div className={styles.selectItems}>
                    <SelectItem text="Join as a vendor" icon={store} />
                    <SelectItem text="Join as a buyer" icon={trolley} />
                </div>

                <Button className="themed-btn">Next</Button>
            </div> */}

        </GreyBackground>
    );
}

function SignUp() {
    return (
        <div className={styles.authBox}>
            <p className={styles.heading}>Create your account</p>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Email</label>
                    <Input />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Password</label>
                    <Input />
                </div>
            </div>
            <div className={styles.row}>
                <Button className='themed-btn'>Sign up</Button>
            </div>
            <div className={`${styles.row} ${styles.withGoogle}`}>
                <img src={googleIcon} />
                <p>Sign in with google</p>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inline} ${styles.center}`}>
                    <p>Already have an account</p><a>Sign in</a>
                </div>
            </div>
        </div>
    )
}

function SignIn() {
    return (
        <div className={styles.authBox}>
            <p className={styles.heading}>Login to your account</p>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Email</label>
                    <Input />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Password</label>
                    <Input />
                </div>
            </div>
            <div className={`${styles.row} ${styles.center}`}>
                <a className={styles.forgotPassword}>Forgot Password</a>
            </div>
            <div className={styles.row}>
                <Button className='themed-btn'>Log In</Button>
            </div>
            <div className={`${styles.row} ${styles.withGoogle}`}>
                <img src={googleIcon} />
                <p>Sign in with google</p>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inline} ${styles.center}`}>
                    <p>Didn't have an account ?</p><a>Sign up</a>
                </div>
            </div>
        </div>
    );
}

function GreyBackground(props) {
    return (
        <div className='grey-background'>{props.children}</div>
    )
}

function SelectItem({ text, icon }) {
    return (
        <div className={styles.selectItem}>
            <img src={icon} />
            <p>{text}</p>
        </div>
    );
}