// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { 
    CognitoIdentityProvider, 
    SignUpCommand, 
    GetUserCommand,
    AdminConfirmSignUpCommand
} = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');
const yup = require('yup');
const { validate } = require('../../models/StoreEntry');
const { sign, verify } = require('jsonwebtoken');

const router = Router();

// const StoreEntry = require('../../models/StoreEntry');

// @desc sign up user and send confirm link to email
// @path POST /api/user/signup
// @authorization public
router.post('/signup', async (req, res, next) => {
    try {
        // validate user input
        const userSchema = yup.object().shape({
            email: yup.string('email must be a string')
                    .required('email is required')
                    .max(127, 'email address is too long')
                    .email('not a valid email address'),
            password: yup.string('password must be a string')
                        .required('password is required')
                        .max(127, 'password is too long')
        });

        const validated = await userSchema.validate(req.body);

        // save user in cognito
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: validated.email,
            Password: validated.password,
        });

        const cognitoSavedUser = await client.send(command);

        // send email verification link
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth : {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        });

        const payload = {
            id: cognitoSavedUser.UserSub,
            email: validated.email
        }

        const secret = `${process.env.EMAIL_CONFIRM_SECRET}`;

        const token = sign(payload, secret, { expiresIn: 3600*24 });

        const url = `http://localhost:5500/api/user/confirmEmail/${token}`;

        const emailTemplate = {
            from: "freebie <freebiesell@zohomail.com>",
            to: validated.email,
            subject: "Email Confirm",
            html: `<h1>this is html text</h1><p>click this link to confirm signup - ${url}</p>`
        };

        const info = await transporter.sendMail(emailTemplate);

        console.log(info);

        // success response
        res.status(200).json({
            success: true,
            userData: validated.email,
            cognitoData: cognitoSavedUser
        });

    // {
    //     "$metadata": {
    //         "httpStatusCode": 200,
    //         "requestId": "75c810d8-a022-4e23-9bbd-d8e2aeed23e1",
    //         "attempts": 1,
    //         "totalRetryDelay": 0
    //     },
    //     "UserConfirmed": false,
    //     "UserSub": "c5b426ec-ffcd-445d-a6fc-036a8898ca37"
    // }

    } catch(error) {
        
        next(error);
    }
});

// @desc confirm email with token
// @path GET /api/user/confirmEmail/:token
// @authorization public
router.get('/confirmEmail/:token', async (req, res, next) => {
    try {

        const { token } = req.params;

        const secret = `${process.env.EMAIL_CONFIRM_SECRET}`;

        const decoded = verify(token, secret);

        // console.log(decoded);

        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new AdminConfirmSignUpCommand({
            UserPoolId: process.env.USER_POOL_ID,
            Username: decoded.id
        });

        const response = await client.send(command);

        res.status(200).json(response);

        /*
        {
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "bfad74bc-8228-4bff-b18c-3520582c8a13",
                "attempts": 1,
                "totalRetryDelay": 0
            }
        }
        */ 

        /*
        - two options
            - redirect user to login page
            - redirect user to dashboard page without login (token will fetched by admin api operations)

        {
            id: '932ae7ba-594c-4208-a9be-bd717d1587e7',
            email: 'lakshanperera.dev@gmail.com',
            iat: 1658855828,
            exp: 1658942228
        }
        */ 

        // const secret = `${}-${req.body.password}`;
        // const signedJwt = sign()

    } catch (error) {
        next(error);
    }
});

module.exports = router;
