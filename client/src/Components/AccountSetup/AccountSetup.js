import react from 'react';
import Background from '../Background/Background';
import Card from '../Card/Card';
import TopNav from '../TopNav';
import { Input, Button, Form } from 'antd';
import style from './accountSetup.module.scss';

import Icon from '../../assets/vendor-setup-screen.svg';
import GreyDot from '../../assets/grey-dot.svg';
import BlackDot from '../../assets/black-dot.svg';
import Remove from '../../assets/remove-icon.svg';
import Logo from '../../assets/logo-placeholder.png';
import Banner from '../../assets/banner-placeholder.png';

export default function AccountSetup() {

    const positionStyle = {
        top: "calc(50% - 545.28px/2 + 53px/2)",
        maxWidth: "600px",
        height: "550px"
    }

    return (
        <Background>
            <TopNav hideHamburger={true} />
            <Card style={positionStyle}>
                {/* <First /> */}
                {/* <Second /> */}
                <Third />
                <Dots />
            </Card>
        </Background>
    );
}

function First() {
    return (
        <div className={style.first}>
            <img src={Icon} />
            <h2>You're almost there</h2>
            <p>Continue with the next steps to create a store for you</p>
            <Button className={`themed-btn ${style.customButton}`}>Continue</Button>
        </div>
    );
}

function Second() {

    const validate = (event, storeName) => {
        console.log(event, storeName);
    }

    return (
        <div className={style.second}>
            <h2>Details</h2>
            <div className={style.uploadItem}>
                <Button className={`themed-btn ${style.customButton}`}>Upload</Button>
                <br/>
                <img src={Logo} />
            </div>
            <div className={style.uploadItem}>
                <Button className={`themed-btn ${style.customButton}`}>Upload</Button>
                <br/>
                <img src={Banner} />
            </div>
            <Button className={`themed-btn ${style.customButton}`}>Next</Button>
        </div>
    );
}

function Third() {

    const handleInputChange = () => {

    }

    const validate = (event, fieldName) => {
        console.log(event, fieldName);
    }

    return (
        <div className={style.third}>
            <h2>Details</h2>
            <Form.Item className={style.formItem}>
                <label>Store Name</label>
                <Input
                    name="storeName"
                    onBlur={(e) => validate(e.target.value, "storeName")} 
                    onChange={handleInputChange}
                    // value={signInState.password} 
                />
            </Form.Item>
            <Form.Item className={style.formItem}>
                <label>Email</label>
                <Input
                    name="storeName"
                    onBlur={(e) => validate(e.target.value, "storeName")} 
                    onChange={handleInputChange} 
                    // value={signInState.password} 
                />
            </Form.Item>
            <div className={style.inline}>
                <Form.Item className={style.formItem}>
                    <label>First Name</label>
                    <Input
                        name="firstName"
                        onBlur={(e) => validate(e.target.value, "firstName")} 
                        onChange={handleInputChange} 
                        // value={signInState.password} 
                    />
                </Form.Item>
                <Form.Item className={style.formItem}>
                    <label>Last Name</label>
                    <Input
                        name="lastName"
                        onBlur={(e) => validate(e.target.value, "lastName")} 
                        onChange={handleInputChange} 
                        // value={signInState.password} 
                    />
                </Form.Item>
            </div>
            <Form.Item className={style.formItem}>
                <label>Phone</label>
                <Input
                    name="phone"
                    onBlur={(e) => validate(e.target.value, "phone")} 
                    onChange={handleInputChange} 
                    // value={signInState.password} 
                />
            </Form.Item>
            <div className={style.inline}>
                <Form.Item className={style.formItem}>
                    <label>City</label>
                    <Input
                        name="city"
                        onBlur={(e) => validate(e.target.value, "firstName")} 
                        onChange={handleInputChange} 
                        // value={signInState.password} 
                    />
                </Form.Item>
                <Form.Item className={style.formItem}>
                    <label>Country</label>
                    <Input
                        name="country"
                        onBlur={(e) => validate(e.target.value, "lastName")} 
                        onChange={handleInputChange} 
                        // value={signInState.password} 
                    />
                </Form.Item>
            </div>
            <Button className={`themed-btn ${style.customButton}`}>Finish</Button>
        </div>
    );
}

function Dots() {
    return (
        <div className={style.dotsWrapper}>
            <div className={style.dots}>
                <img src={BlackDot} />
                <img src={GreyDot} />
                <img src={GreyDot} />
            </div>
        </div>
    );
}