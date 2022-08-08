import React from 'react';
import styles from './AuthGlobalStyles.module.scss';

import confirmEmail from '../../assets/confirm-email.png';

export default function ConfirmEmail() {

    const centerBoxOverWrite = {
        height: "550px",
        display: "flex"
        // margin: "auto"
    }

    const innerBox = {
        margin: "auto"
    }

    const heading = {
        margin: "2rem 0 1rem 0"
    }

    return(
        <div className={styles.centerBox} style={centerBoxOverWrite}>
            <div style={innerBox}>
                <img src={confirmEmail} alt="confirm email icon" />
                <h2 style={heading}>Confirm your email</h2>
                <p>We’ve sent an email to your account, Please check your inbox and find the confirmation email we’ve sent you</p>
            </div>
        </div>
    );
}