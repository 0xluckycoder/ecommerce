import react, { useState, useRef, useEffect } from 'react';
import Background from '../Background/Background';
import Card from '../Card/Card';
import TopNav from '../TopNav';
import RemoveIcon from '../RemoveIcon/RemoveIcon';
import { Input, Button, Form, Alert } from 'antd';
import style from './accountSetup.module.scss';

import Icon from '../../assets/vendor-setup-screen.svg';
import GreyDot from '../../assets/grey-dot.svg';
import BlackDot from '../../assets/black-dot.svg';
import Logo from '../../assets/logo-placeholder.png';
import Banner from '../../assets/banner-placeholder.png';

export default function AccountSetup() {

    const [step, setStep] = useState(1);
    const [fieldState, setFieldState] = useState({
        logo: {
            blob: "",
            file: null
        },
        banner: {
            blob: "",
            file: null
        },
        storeName: "",
        firstName: "",
        lastName: "",
        phone: "",
        city: "",
        country: ""
    });

    const [error, setError] = useState({
        logoError: null,
        bannerError: null,
        storeNameError: null,
        firstNameError: null,
        lastNameError: null,
        phoneError: null,
        cityError: null,
        countryError: null,
    });

    const handleStep = (step) => {

        if (step === 'next') {
            setStep(step => step + 1);
        } else {
            setStep(step => step - 1);
        }
    }

    // useEffect(() => {

    // }, []);

    const handleSubmit = async () => {
        try {

            /*
                - upload images to s3 and retrieve image links
                - fetch vendorEntity object id from /vendor/user/
                - create new store and assign store id in vendorEntity
                - update vendor entity 

                - [x] - Test Endpoints individually
                    - [x] - upload banner & logo to s3
                    - [x] - fetch vendorEntity by authenticated user id
                    - [x] - create store
                    - [x] - update vendor

                - [x] - create all store endpoints
                    - [x] - create
                    - [x] - get store by id
            */  

            /*  
            // logo
            let logoFormData = new FormData();
            logoFormData.append('logo', fieldState.logo.file)
            
            // banner
            let bannerFormData = new FormData();
            bannerFormData.append('banner', fieldState.banner.file);

            const logoUploadResponse = await fetch('http://localhost:5500/api/v1/vendor/logo', {
                method: 'POST',
                credentials: "include",
                body: logoFormData
            });
            const { data: logoUrl } = await logoUploadResponse.json();

            const bannerUploadResponse = await fetch('http://localhost:5500/api/v1/vendor/banner', {
                method: 'POST',
                credentials: "include",
                body: bannerFormData
            });
            const { data: bannerUrl } = await bannerUploadResponse.json();


            // fetch vendor attributes object
            const getVendorByAuthUserResponse = await fetch('http://localhost:5500/api/v1/vendor/user', {
                method: 'GET',
                credentials: "include"
            });
            const getVendorByAuthUserData = await getVendorByAuthUserResponse.json();

            console.log(getVendorByAuthUserData);

            */
            // store attributes
            const storeEntityData = {
                storeName: fieldState.storeName,
                logo: 'logoUrl',
                banner: 'bannerUrl'
            }

            const createStoreResponse = await fetch(`http://localhost:5500/api/v1/store`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(storeEntityData)
            });

            const createStoreData = await createStoreResponse.json();
            console.log(createStoreData);

            // // vendor attributes
            // const vendorEntityData = {
            //     firstName: fieldState.firstName,
            //     lastName: fieldState.lastName,
            //     storeId: 'createStoreResponse.storeId'
            // }
            // if (fieldState.phone) vendorEntityData.phone = fieldState.phone;
            // if (fieldState.city) vendorEntityData.city = fieldState.city;
            // if (fieldState.country) vendorEntityData.country = fieldState.country;

            // // update vendor
            // const updateVendorResponse = await fetch(`http://localhost:5500/api/v1/vendor/6303b5f569e489a5f2ee3b87`, {
            //     method: 'PUT',
            //     credentials: "include",
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(vendorEntityData)
            // });

            // const updateVendorData = await updateVendorResponse.json();
            // console.log('🔥', updateVendorData);




            /* 
                const getVendorResponse = await fetch('http://localhost:5500/api/v1/vendor/test/17196fa3-c92f-4afa-9510-d17ad320167e', {
                    method: 'GET',
                    credentials: "include"
                });
                const data = await getVendorResponse.json();
                console.log(data);
            */

            /*
            create authentication middle ware in backend api
            pass the current user with next function
            */ 

            // const updateVendorResponse = await fetch('http://localhost:5500')

            // const response = await fetch('http://localhost:5500/api/v1/vendor/logo', {
            //     method: 'POST',
            //     credentials: "include",
            //     // headers: {
            //     //     'Content-Type': 'multipart/form-data'
            //     // },
            //     body: formData
            // });

            // console.log(response);
            // const data = await response.json();

            // console.log(data);

            // const bodyData = {
            //     ...fieldState,
            //     logo: logo,
            //     banner: banner
            // }
            // console.log(bodyData);
            // const response = await fetch('http://localhost:5500/api/vendor', {
            //     method: 'POST',
            //     credentials: true,
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(bodyData)
            // });

            // const data = await response.json();
            // console.log(data);

        } catch(error) {
            console.log(error);
        }
    }

    const validateImages = (file, field) => {

        if (field === "logo") {
            // validate size
            if (file.size > 1024 * 1024) {
                console.log('too large');
                setError(error => ({...error, logoError: {
                    validateStatus: "error",
                    help: "file size too large"
                }}));
                return;
            } else {
                setError(error => ({ ...error, logoError: null }));
            }

            // validate type
            if (file.type === "image/jpeg" || file.type === 'image/png') {
                console.log('valid file type');
                setError(error => ({ ...error, logoError: null }));
            } else {
                console.log('invalid file type');
                setError(error => ({...error, logoError: {
                    validateStatus: "error",
                    help: "Invalid file type"
                }}));
                return;
            }
        } else {
            // validate size
            if (file.size > 1024 * 1024) {
                console.log('too large');
                setError(error => ({...error, bannerError: {
                    validateStatus: "error",
                    help: "file size too large"
                }}));
                return;
            } else {
                setError(error => ({ ...error, bannerError: null }));
            }

            // validate type
            if (file.type === "image/jpeg" || file.type === 'image/png') {
                console.log('valid file type');
                setError(error => ({ ...error, bannerError: null }));
            } else {
                console.log('invalid file type');
                setError(error => ({...error, bannerError: {
                    validateStatus: "error",
                    help: "Invalid file type"
                }}));
                return;
            }
        }

        // if no errors construct the blob to preview and store the file
        const imageObjUrl = URL.createObjectURL(file);
        if (field === 'logo') {
            setFieldState({...fieldState, logo: {
                blob: imageObjUrl,
                file
            }});
        } else {
            setFieldState({...fieldState, banner: {
                blob: imageObjUrl,
                file
            }});
        }
    }

    const validate = (value, field) => {
        if (field === "storeName") {
            if (value === "") {
                setError(error => ({...error, storeNameError: {
                    validateStatus: "error",
                    help: "This field is required"
                }}));
            } else {
                setError(error => ({ ...error, storeNameError: null }));
            }
        }

        if (field === "firstName") {
            if (value === "") {
                setError(error => ({...error, firstNameError: {
                    validateStatus: "error",
                    help: "This field is required"
                }}));
            } else {
                setError(error => ({ ...error, firstNameError: null }));
            }
        }

        if (field === "lastName") {
            if (value === "") {
                setError(error => ({...error, lastNameError: {
                    validateStatus: "error",
                    help: "This field is required"
                }}));
            } else {
                setError(error => ({ ...error, lastNameError: null }));
            }
        }
    }

    const positionStyle = {
        top: "calc(50% - 545.28px/2 + 53px/2)",
        maxWidth: "600px",
        height: "550px"
    }

    return (
        <Background>
            <TopNav hideHamburger={true} />
            <Card style={positionStyle} lg={true}>
                {step === 1 && <First handleStep={handleStep} />}
                {step === 2 && <Second 
                                    fieldState={fieldState} 
                                    setFieldState={setFieldState} 
                                    handleStep={handleStep}
                                    validateImages={validateImages}
                                    error={error} 
                                />}
                {step === 3 && <Third 
                                    fieldState={fieldState} 
                                    setFieldState={setFieldState} 
                                    handleStep={handleStep}
                                    error={error}
                                    setError={setError}
                                    validate={validate}
                                    handleSubmit={handleSubmit}
                                />
                }
                <Dots step={step} />
            </Card>
        </Background>
    );
}

function First({ handleStep }) {
    return (
        <div className={style.first}>
            <img src={Icon} />
            <h2>You're almost there</h2>
            <p>Continue with the next steps to create a store for you</p>
            <Button
                onClick={() => handleStep('next')} 
                className={`themed-btn ${style.customButton}`}
            >Continue</Button>
        </div>
    );
}

function Second({ handleStep, fieldState, error, validateImages, setFieldState }) {

    const logo = useRef(null);
    const banner = useRef(null);

    const handleClick = (e, imageName) => {
        if (imageName === "logo") {
            logo.current.click();   
        } else {
            banner.current.click();
        }
    }

    console.log('logo', fieldState.logo);
    console.log('banner' ,fieldState.banner);

    return (
        <div className={style.second}>
            <h2>Details</h2>
            {error.logoError ? <Alert message={error.logoError.help} type="error" /> : null}
            <div className={style.uploadItem}>
                <Button 
                    className={`themed-btn ${style.customButton}`}
                    onClick={(e) => handleClick(e, 'logo')}
                >
                    Upload
                </Button>
                <input 
                    type="file" 
                    className={style.uploadButton}
                    ref={logo}
                    onChange={(e) => validateImages(e.target.files[0], 'logo')}
                    hidden 
                />
                <br/>
                <img 
                    className={style.logoImage} 
                    src={fieldState.logo.blob ? fieldState.logo.blob : Logo} 
                />
                {fieldState.logo.blob && <RemoveIcon 
                                        left={10} 
                                        top={85} 
                                        imageFieldName={"logo"}
                                        state={fieldState}
                                        setState={setFieldState} 
                                    />
                }
            </div>
            {error.bannerError ? <Alert message={error.bannerError.help} type="error" /> : null}
            <div className={style.uploadItem}>
                <Button 
                    className={`themed-btn ${style.customButton}`}
                    onClick={(e) => handleClick(e, 'banner')}
                >
                    Upload
                </Button>
                <input 
                    type="file" 
                    className={style.uploadButton}
                    ref={banner}
                    onChange={(e) => validateImages(e.target.files[0], 'banner')}
                    hidden 
                />
                <br/>
                <img 
                    className={style.bannerImage} 
                    src={fieldState.banner.blob ? fieldState.banner.blob : Banner} 
                />
                {fieldState.banner.blob && <RemoveIcon 
                        left={10} 
                        top={268} 
                        imageFieldName={"banner"}
                        state={fieldState}
                        setState={setFieldState} 
                    />
                }
            </div>
            {fieldState.logo.blob === "" || fieldState.banner.blob === "" ?
            
            (<Button className={`themed-grey-btn ${style.customButton}`}>Next</Button>) :

            (<Button 
                onClick={() => handleStep('next')} 
                className={`themed-btn ${style.customButton}`
            }>Next</Button>)
            }
        </div>
    );
}

function Third({ handleStep, fieldState, setFieldState, error, handleSubmit , validate }) {

    const handleInputChange = (e) => {
        setFieldState({...fieldState, [e.target.name]: e.target.value});
    }

    return (
        <div className={style.third}>
            <h2>Details</h2>
            <Form.Item {...(error.storeNameError ? error.storeNameError : {})} className={style.formItem}>
                <label>Store Name</label>
                <Input
                    name="storeName"
                    onBlur={(e) => validate(e.target.value, "storeName")} 
                    onChange={handleInputChange}
                    value={fieldState.storeName} 
                />
            </Form.Item>
            <div className={style.inline}>
                <Form.Item {...(error.firstNameError ? error.firstNameError : {})} className={style.formItem}>
                    <label>First Name</label>
                    <Input
                        name="firstName"
                        onBlur={(e) => validate(e.target.value, "firstName")} 
                        onChange={handleInputChange} 
                        value={fieldState.firstName} 
                    />
                </Form.Item>
                <Form.Item {...(error.lastNameError ? error.lastNameError : {})} className={style.formItem}>
                    <label>Last Name</label>
                    <Input
                        name="lastName"
                        onBlur={(e) => validate(e.target.value, "lastName")} 
                        onChange={handleInputChange} 
                        value={fieldState.lastName} 
                    />
                </Form.Item>
            </div>
            <Form.Item {...(error.phoneError ? error.phoneError : {})} className={style.formItem}>
                <label>Phone</label>
                <Input
                    name="phone"
                    onBlur={(e) => validate(e.target.value, "phone")} 
                    onChange={handleInputChange} 
                    value={fieldState.phone} 
                />
            </Form.Item>
            <div className={style.inline}>
                <Form.Item {...(error.phoneError ? error.phoneError : {})} className={style.formItem}>
                    <label>City</label>
                    <Input
                        name="city"
                        onBlur={(e) => validate(e.target.value, "city")} 
                        onChange={handleInputChange} 
                        value={fieldState.city} 
                    />
                </Form.Item>
                <Form.Item {...(error.countryError ? error.countryError : {})} className={style.formItem}>
                    <label>Country</label>
                    <Input
                        name="country"
                        onBlur={(e) => validate(e.target.value, "country")} 
                        onChange={handleInputChange} 
                        value={fieldState.country} 
                    />
                </Form.Item>
            </div>
            <div className={style.inline}>
                {error.storeNameError === null && error.firstNameError === null && error.lastNameError === null ?
                    (<Button className={`themed-btn ${style.customButton}`} onClick={() => handleSubmit()}>Finish</Button>)
                    :
                    (<Button className={`themed-grey-btn ${style.customButton}`}>Finish</Button>)
                }
                <Button onClick={() => handleStep('back')}  className={`themed-btn ${style.customButton}`}>Back</Button>
            </div>
        </div>
    );
}

function Dots({ step }) {

    return (
        <div className={style.dotsWrapper}>
            <div className={style.dots}>
                {step === 1 ? <img src={BlackDot} /> : <img src={GreyDot} />}
                {step === 2 ? <img src={BlackDot} /> : <img src={GreyDot} />}
                {step === 3 ? <img src={BlackDot} /> : <img src={GreyDot} />}
            </div>
        </div>
    );
}