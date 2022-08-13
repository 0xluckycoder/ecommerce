import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../TopNav';
// import { Input, Button, Form, Alert } from 'antd';
import Background from '../Background/Background';

import { Outlet } from 'react-router-dom';

export default function AuthPage() {
    return (
        <Background>
            <TopNav hideHamburger={true} />
            <Outlet />
        </Background>
    );
}