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

const VendorEntry = require('../models/VendorEntry');
const BuyerEntry = require('../models/BuyerEntry');

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
            const vendorEntry = new VendorEntry({
                cognitoId: signUpCommandResponse.UserSub,
                firstName: "null",
                lastName: "null",
                storeId: "null",
                userStatus: "initial"
            });
            const createdVendorEntry = await vendorEntry.save();
            console.log(createdVendorEntry);
        } else {
            const buyerEntry = new BuyerEntry({
                cognitoId: signUpCommandResponse.UserSub,
                firstName: "null",
                lastName: "null",
                storeId: "null",
                userStatus: "initial"
            });
            const createdBuyerEntry = await buyerEntry.save();
            console.log(createdBuyerEntry);
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
        console.log('original error ❌❌', error);
        throw error;
        // next(error);
    }
    
    // return;
}

const signIn = () => {
    return;
}

const confirmEmail = () => {
    return;
}

const verifyAuth = () => {
    return;
}

module.exports = {
    signUp,
    signIn,
    confirmEmail,
    verifyAuth
}