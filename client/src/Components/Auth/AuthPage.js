import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../TopNav';
// import { Input, Button, Form, Alert } from 'antd';

import { Outlet } from 'react-router-dom';

export default function AuthPage() {

    return (
        <GreyBackground>

            <TopNav hideHamburger={true} />

            <Outlet />

            {/* <Routes>
                <Route path="public/auth/login" element={<SignIn navigate={navigate} />} />
                <Route path="public/auth/signup" element={<SignUp navigate={navigate} />} />
                <Route path="public/auth/chooseRole" element={<ChooseRole navigate={navigate} />} />
                <Route path="public/auth/forgotPassword" element={<ForgotPassword navigate={navigate} />} />
            </Routes> */}

        </GreyBackground>
    );
}

// function ForgotPassword({ navigate }) {

//     const [forgotPasswordState, setForgotPasswordState] = useState({});

//     const handleInputChange = (e) => {
//         setForgotPasswordState({[e.target.name]: e.target.value});
//     }

//     return (
//         <div className={styles.authBox}>
//             <p className={styles.heading}>Forgot Password</p>
//             <div className={styles.row}>
//                 <p>If you have an account with this email address we will send you the link for password reset</p>
//             </div>
//             <div className={styles.row}>
//                 <div className={styles.formItem}>
//                     <label name="email">Email</label>
//                     <Input onClick={handleInputChange} />
//                 </div>
//             </div>
//             <div className={styles.row}>
//                 <Button className='themed-btn'>Submit</Button>
//             </div>
//             <div className={styles.row}>
//                 <Button onClick={() => navigate('/public/auth/login')} className='themed-btn'>Cancel</Button>
//             </div>
//         </div>
//     );
// }





function GreyBackground(props) {
    return (
        <div className='grey-background'>{props.children}</div>
    )
}