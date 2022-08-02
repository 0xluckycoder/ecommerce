import React, { useState } from 'react';
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
- [x] - make select item works even when user clicks on the image
- [x] - add active class and highlight the active selected item
- [ ] - organize auth routes
- [ ] - add validation to form fields
- [ ] - make the component heights dynamic when showing errors

*/

export default function AuthPage() {

    const navigate = useNavigate();

    return (
        <GreyBackground>

            <TopNav hideHamburger={true} />

            <Routes>
                <Route path="public/auth/login" element={<SignIn navigate={navigate} />} />
                <Route path="public/auth/signup" element={<SignUp navigate={navigate} />} />
                <Route path="public/auth/chooseRole" element={<ChooseRole navigate={navigate} />} />
                <Route path="public/auth/forgotPassword" element={<ForgotPassword navigate={navigate} />} />
            </Routes>

        </GreyBackground>
    );
}

function ForgotPassword({ navigate }) {

    const [forgotPasswordState, setForgotPasswordState] = useState({});

    const handleInputChange = (e) => {
        setForgotPasswordState({[e.target.name]: e.target.value});
    }

    return (
        <div className={styles.authBox}>
            <p className={styles.heading}>Forgot Password</p>
            <div className={styles.row}>
                <p>If you have an account with this email address we will send you the link for password reset</p>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label name="email">Email</label>
                    <Input onClick={handleInputChange} />
                </div>
            </div>
            <div className={styles.row}>
                <Button className='themed-btn'>Submit</Button>
            </div>
            <div className={styles.row}>
                <Button onClick={() => navigate('/public/auth/login')} className='themed-btn'>Cancel</Button>
            </div>
        </div>
    );
}

function SignUp({ navigate }) {

    const [signUpState, setSignUpState] = useState({
        role: "",
        roleSelectedByUser: false
    });

    const handleInputChange = (e) => {
        setSignUpState({[e.target.name]: e.target.value});
    }

    return (
        <>

        {signUpState.role && signUpState.roleSelectedByUser 
        
        ?

        <div className={styles.authBox}>
            <p className={styles.heading}>Create your account</p>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Email</label>
                    <Input name="email" onChange={handleInputChange} />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label>Password</label>
                    <Input name="password" onChange={handleInputChange} />
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
                    <p>Already have an account</p><a onClick={() => navigate('/public/auth/login')}>Sign in</a>
                </div>
            </div>
        </div>
        
        :
        
        <ChooseRole navigate={navigate} signUpState={signUpState} setSignUpState={setSignUpState} />
        
        }

        </>
    )
}

function ChooseRole({ navigate, signUpState, setSignUpState }) {
    
    const handleNextPageClick = () => {
        setSignUpState({ ...signUpState, roleSelectedByUser: true });
    }

    return (
        <div className={styles.centerBox}>
        
            <h2>Join as a vendor or buyer</h2>

            <div className={styles.selectItems}>
                <SelectItem
                    id="vendor"
                    text="Join as a vendor" 
                    icon={store}
                    signUpState={signUpState}
                    setSignUpState={setSignUpState}
                />
                <SelectItem 
                    id="buyer"
                    text="Join as a buyer" 
                    icon={trolley}
                    signUpState={signUpState}
                    setSignUpState={setSignUpState}
                />
            </div>

            <div className={styles.inlineButtons}>
                <Button onClick={() => navigate('/public/auth/login')} className="themed-btn">Cancel</Button>
                <Button onClick={() => handleNextPageClick()} className="themed-btn">Next</Button>
            </div>

        </div>
    );
}

function SelectItem({ text, icon, id, signUpState, setSignUpState }) {

    const handleSelecItemClick = (e) => {
        setSignUpState({...signUpState, role: e.target.id})
    }

    return (
        <div 
            onClick={e => handleSelecItemClick(e)} 
            className={`${styles.selectItem} ${signUpState.role === id ? styles.active : null}`} 
            id={id}
        >
            <img src={icon} id={id} />
            <p id={id}>{text}</p>
        </div>
    );
}

function SignIn({ navigate }) {

    const [signInState, setSignInState] = useState({});

    const handleInputChange = (e) => {
        setSignInState({[e.target.name]: e.target.value});
    }

    return (
        <div className={styles.authBox}>
            <p className={styles.heading}>Login to your account</p>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label onClick={handleInputChange}>Email</label>
                    <Input />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.formItem}>
                    <label onClick={handleInputChange}>Password</label>
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
                    <p>Didn't have an account ?</p><a onClick={() => navigate('/public/auth/signup')}>Sign up</a>
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