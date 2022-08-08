import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../TopNav';
// import { Input, Button, Form, Alert } from 'antd';

import { Outlet } from 'react-router-dom';

export default function AuthPage() {

    return (
        <GreyBackground>
            <TopNav hideHamburger={true} />
            <Outlet />
        </GreyBackground>
    );
}

function GreyBackground(props) {
    return (
        <div className='grey-background'>{props.children}</div>
    )
}