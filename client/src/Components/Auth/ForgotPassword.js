import React, { useState } from 'react';
import styles from './AuthGlobalStyles.module.scss';
import { Input, Button, Form, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const navigate = useNavigate();

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
                <Button onClick={() => navigate('/auth/signin')} className='themed-btn'>Cancel</Button>
            </div>
        </div>
    );
}
