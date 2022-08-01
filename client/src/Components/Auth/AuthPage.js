import React from 'react';
import styles from './AuthPage.module.scss';
import trolley from '../../assets/trolley.svg';
import store from '../../assets/store.svg';
import googleIcon from '../../assets/google-icon.svg';
import TopNav from '../TopNav';
import { Input, Button } from 'antd';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

/*
- [x] - create seperate top navigation bar without hamburger menu called (topnavBrand) and use it in authenticate pages as a topnavbar
- [x] - create a parent page for grey background with a centered box
- [x] - create a grey page wrapper
- [x] - try to include both signin and signup pages in this component
- [x] - make the page mobile firendly
- [x] - create a flow and link all components accordingly
- [ ] - add validation to form fields
- [ ] - make the component heights dynamic when showing errors
*/

export default function AuthPage() {

    const navigate = useNavigate();

    return (
        <GreyBackground>

            <TopNav hideHamburger={true} />

            <Routes>
                <Route path="/auth/login" element={<SignIn navigate={navigate} />} />
                <Route path="/auth/signup" element={<SignUp navigate={navigate} />} />
                <Route path="/auth/forgotPassword" element={<ForgotPassword navigate={navigate} />} />
            </Routes>

        </GreyBackground>
    );
}

function ForgotPassword({ navigate }) {
    return (
        <div className={styles.authBox}>
            <p className={styles.heading}>Forgot Password</p>
            <div className={styles.row}>
                <p>If you have an account with this email address we will send you the link for password reset</p>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Email</label>
                    <Input />
                </div>
            </div>
            <div className={styles.row}>
                <Button className='themed-btn'>Submit</Button>
            </div>
            <div className={styles.row}>
                <Button onClick={() => navigate('/auth/login')} className='themed-btn'>Cancel</Button>
            </div>
        </div>
    );
}

function SignUp({ navigate }) {
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
                <p>Sign up with google</p>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inline} ${styles.center}`}>
                    <p>Already have an account</p><a onClick={() => navigate('/auth/login')}>Sign in</a>
                </div>
            </div>
        </div>
    )
}

function SignIn({ navigate }) {
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
                <a onClick={() => navigate('/auth/forgotPassword')} className={styles.forgotPassword}>Forgot Password</a>
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
                    <p>Didn't have an account ?</p><a onClick={() => navigate('/auth/signup')}>Sign up</a>
                </div>
            </div>
        </div>
    )
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