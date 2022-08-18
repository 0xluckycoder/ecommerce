import React, { useState, useRef, useEffect, useContext } from 'react';

import styles from './AuthGlobalStyles.module.scss';
import trolley from '../../assets/trolley.svg';
import store from '../../assets/store.svg';
import googleIcon from '../../assets/google-icon.svg';

import { useNavigate } from 'react-router-dom';

import { Input, Button, Form, Alert } from 'antd';
import { ACTIONS, DispatchContext, ROUTES, StateContext } from '../../App';
import Card from '../Card/Card';

export default function SignUp() {

    // consume auth context
    const { dispatch } = useContext(DispatchContext);
    const { state } = useContext(StateContext);

    const navigate = useNavigate();

    const [signUpState, setSignUpState] = useState({
        role: "",
        roleSelectedByUser: false,
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        emailError: null,
        passwordError: null
    });

    const [allowedToCallApiState, setAllowedToCallApiState] = useState(false);

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

    useEffect(() => {
        if (allowedToCallApiState) {

            const signUpRequest = async () => {
                const bodyData = {
                    email: signUpState.email,
                    password: signUpState.password,
                    role: signUpState.role
                }

                console.log('request sent', bodyData);

                try {
                    dispatch({ type: ACTIONS.LOADING });

                    const response = await fetch('http://localhost:5500/api/v1/auth/signup', {
                        method: 'POST',
                        credentials: "include",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(bodyData)
                    });
                    
                    const data = await response.json();
                    console.log(data);

                    if (data.success === true) {
                        console.log('success');
                        dispatch({ type: ACTIONS.SIGNUP_SUCCESS });
                        navigate(ROUTES.CONFIRM_EMAIL);
                    } else {
                        dispatch({ type: ACTIONS.SIGNUP_ERROR, payload: {
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
                signUpRequest();
                // reset the apiError to default
            } else {
                // disable api access when errors are present
                setAllowedToCallApiState(false);
            }

        }
    }, [error]);

    const handleInputChange = (e) => {
        setSignUpState({...signUpState, [e.target.name]: e.target.value});
    }

    const handleSignUp = () => {

        validateEmail(signUpState.email);
        validatePassword(signUpState.password);
        
        // alllow api to make requests
        setAllowedToCallApiState(true);
    }

    const positionStyle = {
        top: "calc(50% - 393px/2 + 53px/2)",
        maxWidth: "350px",
    }

    return (
        <>

        {signUpState.role && signUpState.roleSelectedByUser || state.errorMessage 
        
        ?

        <Card style={positionStyle}>
            <p className={styles.heading}>Create your account</p>
            {state.errorMessage ? <Alert message={state.errorMessage} type="error" style={{ marginBottom: "24px" }} /> : null}
            <div className={styles.row}>
                <Form.Item {...(error.emailError ? error.emailError : {})}>                    
                    <label>Email</label>
                    <Input 
                        name="email" 
                        onBlur={(e) => validateEmail(e.target.value)} 
                        onChange={handleInputChange}
                        value={signUpState.email}
                    />
                </Form.Item>
            </div>
            <div className={styles.row}>
                <Form.Item {...(error.passwordError ? error.passwordError : {})}>
                    <label>Password</label>
                    <Input 
                        name="password"
                        onBlur={(e) => validatePassword(e.target.value)}
                        onChange={handleInputChange}
                        value={signUpState.password}
                    />
                </Form.Item>
            </div>
            <div className={styles.row}>
                <Button onClick={() => handleSignUp()} className='themed-btn'>Sign up</Button>
            </div>
            <div className={`${styles.row} ${styles.withGoogle}`}>
                <img src={googleIcon} />
                <p>Sign up with google</p>
            </div>
            <div className={styles.row}>
                <div className={`${styles.inline} ${styles.center}`}>
                    <p>
                        Already have an account
                    </p>
                    <a onClick={() => {
                        dispatch({type: ACTIONS.CLEAR_ERROR});
                        navigate(ROUTES.SIGNIN);
                    }}>Sign in</a>
                </div>
            </div>
        </Card>
        
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

    const positionStyle = {
        top: "calc(50% - 545.28px/2 + 53px/2)",
        maxWidth: "600px"
    }

    return (
        // <div className={styles.centerBox}>
        <Card style={positionStyle} lg={true}>
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
                <Button onClick={() => navigate('/auth/signin')} className="themed-btn">Cancel</Button>
                <Button onClick={() => handleNextPageClick()} className="themed-btn">Next</Button>
            </div>
        </Card>
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