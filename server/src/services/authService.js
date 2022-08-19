const { 
    CognitoIdentityProvider, 
    SignUpCommand, 
    GetUserCommand,
    AdminGetUserCommand,
    AdminConfirmSignUpCommand,
    AdminInitiateAuthCommand,
    InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider');
const nodemailer = require('nodemailer');
const { verify } = require('jsonwebtoken');

const vendor = require('../database/vendor');
const buyer = require('../database/buyer'); 

// const VendorEntry = require('../models/VendorEntry');
// const BuyerEntry = require('../models/BuyerEntry');

const generateEmailConfirmTemplate = require('../utils/generateEmailConfirmTemplate');

const signUp = async (user) => {
    
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });
    
        // register new user
        const signUpCommand = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: user.email,
            Password: user.password,
            UserAttributes: [
                {
                    "Name": "custom:role",
                    "Value": user.role
                }
            ]
        });
        const signUpCommandResponse = await client.send(signUpCommand);
    
        // create user attribute record in DB
        if (user.role === 'vendor') {
            await vendor.createVendor({
                cognitoId: signUpCommandResponse.UserSub,
                firstName: "null",
                lastName: "null",
                storeId: "null",
                userStatus: "initial"
            });

        } else {
            await buyer.createBuyer({
                cognitoId: signUpCommandResponse.UserSub,
                firstName: "null",
                lastName: "null",
                storeId: "null",
                userStatus: "initial"
            })
        }

        // email config
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth : {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        });
        const emailTemplate = generateEmailConfirmTemplate(signUpCommandResponse.UserSub, user.email);
        // send email confirm link
        const info = await transporter.sendMail(emailTemplate);
        console.log(info);

        return signUpCommandResponse;

    } catch (error) {
        throw error;
    }
    
    // return;
}

const signIn = async (user) => {
    try {
        // save user in cognito
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // retreive user tokens
        const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: user.email,
                PASSWORD: user.password
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            UserPoolId: process.env.AWS_USER_POOL_ID
        });
        const adminInitiateAuthResponse = await client.send(adminInitiateAuthCommand);
        
        // get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: adminInitiateAuthResponse.AuthenticationResult.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        // construct the response
        const email = getUserResponse.UserAttributes.find(element => element.Name === "email");
        const role = getUserResponse.UserAttributes.find(element => element.Name === "custom:role");
        const data = {
            email: email.Value,
            role: role.Value
        }

        // extract tokens
        const accessToken = adminInitiateAuthResponse.AuthenticationResult.AccessToken;
        const refreshToken = adminInitiateAuthResponse.AuthenticationResult.RefreshToken;
        const idToken = adminInitiateAuthResponse.AuthenticationResult.IdToken;

        return {
            data,
            tokens: {
                accessToken,
                refreshToken,
                idToken
            }
        }

    } catch(error) {
        throw error;
    }
}

const confirmEmail = async (token) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // validate the jwt
        const secret = `${process.env.EMAIL_CONFIRM_SECRET}`;
        const decoded = verify(token, secret);

        const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand({
            UserPoolId: process.env.AWS_USER_POOL_ID,
            Username: decoded.id
        });

        const adminConfirmSignUpResponse = await client.send(adminConfirmSignUpCommand);
        
        return adminConfirmSignUpResponse;

    } catch(error) {
        throw error;
    }
}

const verifyAuth = async (cookies) => {
    try {

        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // validate access token and get user details
        const getUserCommand = new GetUserCommand({
            AccessToken: cookies.AccessToken
        });
        const getUserResponse = await client.send(getUserCommand);

        const email = getUserResponse.UserAttributes.find(element => element.Name === "email");
        const role = getUserResponse.UserAttributes.find(element => element.Name === "custom:role");
        const data = {
            email: email.Value,
            role: role.Value
        }

        return data;

    } catch(error) {
        throw error;
    }
}

const refreshTokens = async (RefreshToken) => {
    try {
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new InitiateAuthCommand({
            AuthFlow: "REFRESH_TOKEN_AUTH",
            AuthParameters: {
                REFRESH_TOKEN: RefreshToken,
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID
        });

        // retreive refreshed access & id tokens
        const InitiateAuthCommandResponse = await client.send(command);
        console.log('new tokens assigned', InitiateAuthCommandResponse);
        return InitiateAuthCommandResponse;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    signUp,
    signIn,
    confirmEmail,
    verifyAuth,
    refreshTokens
}