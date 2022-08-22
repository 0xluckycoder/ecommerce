import React, { useState, useRef, useEffect, useContext } from 'react';

import styles from './AuthGlobalStyles.module.scss';

import googleIcon from '../../assets/google-icon.svg';
import { Input, Button, Form, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext, ACTIONS, ROUTES } from '../../App';

import Card from '../Card/Card';

export default function SignIn() {

    // consume auth contexts
    const { dispatch } = useContext(DispatchContext);
    const { state } = useContext(StateContext);

    const navigate = useNavigate();

    const [signInState, setSignInState] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        emailError: null,
        passwordError: null,
    });

    const [allowedToCallApiState, setAllowedToCallApiState] = useState(false);

    const emailElement = useRef(null);
    const passwordElement = useRef(null);
    
    useEffect(() => {
        if (allowedToCallApiState) {

            const signInRequest = async () => {
                // format the data to sent
                const bodyData = {
                    email: signInState.email,
                    password: signInState.password
                }

                try {
                    dispatch({ type: ACTIONS.LOADING });

                    const signInResponse = await fetch('http://localhost:5500/api/v1/auth/signin', {
                        method: 'POST',
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    });
                
                    
                    const data = await signInResponse.json();
                    console.log(data);

                    if (data.success) {
                        console.log('success login');
                        dispatch({ 
                            type: ACTIONS.SIGNIN_SUCCESS,
                            payload: {
                                email: data.userData.email,
                                role: data.userData.role
                        }});

                        
                        // redirect to account setup if user status is "initial"
                        if (data.userData.role === "vendor") {
                            const getVendorByUserId = await fetch(`http://localhost:5500/api/v1/vendor/user/${data.userData.subId}`);
                            const getVendorByUserIdData = await getVendorByUserId.json();
                            console.log(getVendorByUserIdData);
                            getVendorByUserIdData.data.userStatus === "initial" && navigate(ROUTES.VENDOR_ACCOUNT_SETUP)
                        }
                        // data.userData.role === 'vendor' && navigate('/vendor/dashboard');
                        // add customers redirect route here

                    } else {
                        // if user is not confirmed redirect to email confirm page
                        if (data.message === "User is not confirmed.") {
                            dispatch({ type: ACTIONS.CLEAR_ERROR });
                            navigate(ROUTES.CONFIRM_EMAIL);
                            return;
                        }

                        dispatch({ type: ACTIONS.SIGNIN_ERROR,
                            payload: {
                                errorMessage: data.message
                        }});
                    }

                } catch(error) {
                    console.log('unexpected', error);
                    dispatch({ type: ACTIONS.SIGNIN_ERROR,
                        payload: {
                            errorMessage: "Unknown error occurred"
                    }});
                }
            }

            if (error.emailError === null && error.passwordError === null) {
                signInRequest();

                // reset the apiError to default
            } else {
                // disable api access when errors are present
                setAllowedToCallApiState(false);
            }

        }
    }, [error]);

    const handleInputChange = (e) => {
        setSignInState({...signInState, [e.target.name]: e.target.value});
    }

    const validateEmail = (value) => {

        // validate empty fields
        if (value === "") {
            setError(error => ({...error, emailError: {
                validateStatus: "error",
                help: "This field is required",
            }}));
        } else {
            // validate email address format
            if (! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                setError(error => ({...error, emailError: {
                        validateStatus: "error",
                        help: "Not a valid email"
                    }}));

            } else {
                setError(error => ({ ...error, emailError: null }));
            }
        }
    }

    const validatePassword = (value) => {

        if (value === "") {
            // validate empty fields
            setError(error => ({ ...error, passwordError: {
                    validateStatus: "error",
                    help: "This field is required",
            }}));
        } else {
            setError(error => ({ ...error, passwordError: null }));

            // length must be more than 7 characters
            if (value.length < 7) {
                setError(error => ({...error, passwordError: {
                        validateStatus: "error",
                        help: "must be more than 7 characters"
                }}));
            } else {
                setError(error => ({ ...error, passwordError: null }));
            }
        }
    }

    // const resetInputFields = () => {    
    //     // reset input fields
    //     setSignInState({
    //         email: "",
    //         password: ""
    //     });
    // }

    const handleSignIn = () => {

        validateEmail(signInState.email); 
        validatePassword(signInState.password);
        
        // alllow api to make requests
        setAllowedToCallApiState(true);
    }

    const positionStyle = {
        top: "calc(50% - 393px/2 + 53px/2)",
        maxWidth: "350px"
    }

    return (
        <Card style={positionStyle}>
            <p className={styles.heading}>Login to your account</p>
            {state.errorMessage ? <Alert message={state.errorMessage} type="error" style={{ marginBottom: "24px" }} /> : null}
            <div className={styles.row}>
                <Form.Item {...(error.emailError ? error.emailError : {})}>                    
                    <label>Email</label>
                    <Input 
                        ref={emailElement} 
                        name="email" 
                        onBlur={(e) => validateEmail(e.target.value)} 
                        onChange={handleInputChange} 
                        value={signInState.email}
                    />
                </Form.Item>
            </div>
            <div className={styles.row}>
                <Form.Item {...(error.passwordError ? error.passwordError : {})}>
                    <label>Password</label>
                    <Input
                        ref={passwordElement}
                        name="password"
                        onBlur={(e) => validatePassword(e.target.value)} 
                        onChange={handleInputChange} 
                        value={signInState.password} 
                    />
                </Form.Item>
            </div>
            <div className={`${styles.row} ${styles.center}`}>
                <a onClick={() => navigate('/auth/forgot-password')} className={styles.forgotPassword}>Forgot Password</a>
            </div>
            <div className={styles.row}>
                <Button onClick={() => handleSignIn()} className='themed-btn'>Log In</Button>
            </div>
            <div className={`${styles.row} ${styles.withGoogle}`}>
                <img src={googleIcon} />
                <p>Sign in with google</p>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inline} ${styles.center}`}>
                    <p>Didn't have an account ?</p>
                    <a onClick={() => {
                        dispatch({ type: ACTIONS.CLEAR_ERROR });
                        navigate(ROUTES.SIGNUP);
                    }}>Sign up</a>
                </div>
            </div>
        </Card>
    )
}