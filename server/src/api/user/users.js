// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { 
    CognitoIdentityProvider, 
    SignUpCommand, 
    GetUserCommand,
    AdminGetUserCommand,
    AdminConfirmSignUpCommand,
    AdminInitiateAuthCommand,
    InitiateAuthCommand
} = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');
const yup = require('yup');
const { verify } = require('jsonwebtoken');
const router = Router();

const StoreEntry = require('../../models/StoreEntry');

const generateEmailConfirmTemplate = require('../../lib/generateEmailConfirmTemplate');

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
                        .max(127, 'password is too long'),
            role: yup.string('role must be a string')
                    .required('role is required')
        });

        const validated = await userSchema.validate(req.body);

        console.log(validated);

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
            Username: validated.email,
            Password: validated.password,
            UserAttributes: [
                {
                    "Name": "custom:role",
                    "Value": validated.role
                }
            ]
        });
        const signUpResponse = await client.send(signUpCommand);

        // authenticate the registered user and retreive account details and tokens
        // const adminInitiateAuthcommand = new AdminInitiateAuthCommand({
        //     AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        //     AuthParameters: {
        //         USERNAME: validated.email,
        //         PASSWORD: validated.password
        //     },
        //     ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
        //     UserPoolId: process.env.AWS_USER_POOL_ID
        // });
        // const adminInitiateAuthResponse = await client.send(adminInitiateAuthcommand);

        // retreive user details
        // const getUserCommand = new GetUserCommand({
        //     AccessToken: adminInitiateAuthResponse.AuthenticationResult.AccessToken
        // });
        // const getUserResponse = await client.send(getUserCommand);


        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth : {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        });
        const emailTemplate = generateEmailConfirmTemplate(signUpResponse.UserSub, validated.email);
        // send email confirm link
        const info = await transporter.sendMail(emailTemplate);

        console.log(info);

        // set token cookies
        // construct a format for response

        // success response
        res.status(200).json({
            success: true,
            data: signUpResponse
        });
        /*
        signup response format - 
            {
                "$metadata": {
                    "httpStatusCode": 200,
                    "requestId": "75c810d8-a022-4e23-9bbd-d8e2aeed23e1",
                    "attempts": 1,
                    "totalRetryDelay": 0
                },
                "UserConfirmed": false,
                "UserSub": "c5b426ec-ffcd-445d-a6fc-036a8898ca37"
            }
        */
    } catch(error) {
        
        console.log('original error ❌❌', error);

        next(error);
    }
});

// @desc sign in and retreive tokens
// @path GET /api/user/signin
// @authorization public
router.post('/signin', async (req, res, next) => {
    try {

        console.log(req.body);

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

        // retreive user tokens
        const adminInitiateAuthCommand = new AdminInitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            AuthParameters: {
                USERNAME: validated.email,
                PASSWORD: validated.password
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

        console.log(getUserResponse);

        res.status(200).json({
            success: true,
            data: getUserResponse
        });

        /*
        response format -
        {
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "7a257043-1788-482f-ac87-150245049187",
                "attempts": 1,
                "totalRetryDelay": 0
            },
            "AuthenticationResult": {
                "AccessToken": "eyJraWQiOiJCNnBoUmkyRFwvK2ExckRsV21MXC92UmdBRjJNSVl2MnF0R3Q3VEFGVUVqcjg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJkZXZpY2Vfa2V5IjoidXMtd2VzdC0yX2IyZWQ0ZjRiLWRkMzQtNDhlZi1hM2NkLWU2ZTIwZGY1ODIxOSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzRMekE0RHl0TCIsImNsaWVudF9pZCI6IjZ1ZHRiMGh2djhvYTJyNmIwbGtjaG0yaG5xIiwib3JpZ2luX2p0aSI6IjI3NDllNjUyLWU0ZDMtNGFiMC04YTJmLTFlMTExNDg2ZWIyNSIsImV2ZW50X2lkIjoiN2EyNTcwNDMtMTc4OC00ODJmLWFjODctMTUwMjQ1MDQ5MTg3IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTY1ODg1OTk5MSwiZXhwIjoxNjU4ODYzNTkxLCJpYXQiOjE2NTg4NTk5OTEsImp0aSI6ImFhNDU3MTQ0LTY5M2EtNDI0Mi04YTFjLTQ2NzNhMzFlNmM5YSIsInVzZXJuYW1lIjoiMDc3YTFjNmYtMzEzZi00MjhmLTgyODMtMTQyYWRiYTE4YjdlIn0.qV9jY6ZjuAnhx7zUDixQ1ZPuiz2SrZ7wpghyIzZSTkPzARhFGL609Gi0SIH9WeyQMRT6x8Ouzvt7nLgGNq8ms6PjungXe1D6d6a9rbsgJbsTzepnW_jJL08-DOYUamhf_dfxOBga-M5Kx86KzRa9q6HBjnb4WGXL3QjIdIRiVJd1VktK2-JMBZRczni-XIyAQjrcSW0rgmvcXo8tF-_uDp1ntOeLEAijSuARkruhZ-rU1fOspV085WPCsfd6lWP68LM1yU7vNpTRpx8Tv_R3Rrynzzxc8zjEqAKo2sm4yXCtjTWl3ywrbq3xBj1QcO2OQVpLyOcAg_fEiZeQSx5vrw",
                "ExpiresIn": 3600,
                "IdToken": "eyJraWQiOiI1VktYcGlId2FsSTZiMHhaMEFWcmhLd25HVG5KTHkzeFNhODJpbmVEVDZ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzRMekE0RHl0TCIsImNvZ25pdG86dXNlcm5hbWUiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJvcmlnaW5fanRpIjoiMjc0OWU2NTItZTRkMy00YWIwLThhMmYtMWUxMTE0ODZlYjI1IiwiYXVkIjoiNnVkdGIwaHZ2OG9hMnI2YjBsa2NobTJobnEiLCJldmVudF9pZCI6IjdhMjU3MDQzLTE3ODgtNDgyZi1hYzg3LTE1MDI0NTA0OTE4NyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU4ODU5OTkxLCJleHAiOjE2NTg4NjM1OTEsImlhdCI6MTY1ODg1OTk5MSwianRpIjoiZTcwNWE4MDEtNTgyZi00NzI2LWIzMDgtMzE1NjU4YmViNjQ2IiwiZW1haWwiOiJsYWtzaGFucGVyZXJhLmRldkBnbWFpbC5jb20ifQ.n8AMZdGKJCmvxWpB5hIZ9anC2yWxJ5649yYf5UGNono9X99gYSUU0GZmDIHVLdRV9k-_9Ean2_sFo4XLXiYb5tAPveUSiLBahCVQfOAi_Ty4sRZmyQcYDgHbJTdr0om4PF65hEGKUnG4dTY6NY0-0WvN7YUUbi5ZCRnWuaZzzri0D0oRAJmO9340b23cHXuuNo9m2TviURd1-Zit8yFttHi_XDdwqkgRfyOPeKnNVu_hnvQ0_ZC0LVq3kPavnEji9XKakSoKPqWR8Z-2E9c7Q-N-k6ul79ZAZjQnK3dBQaoB6AdCWrHYK84O6PcdHvX4oNYodJBqxJnHGEsEr_QtoA",
                "NewDeviceMetadata": {
                    "DeviceGroupKey": "-nNwnPidS",
                    "DeviceKey": "us-west-2_b2ed4f4b-dd34-48ef-a3cd-e6e20df58219"
                },
                "RefreshToken": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.r1E0SLwsSEpEBBPTLYicmqMldS4wP5V_UNpa6w8Ouqe2UKnYYH2kHph13Rownz_bFUq0RYwIEa5GhPXrpc7YPXLOc5vCk0XeKSzyQKvjV92BJ28UsQIQELLOW1yoAjlEtfRm235pHV-qm9vw3IRkNLZ7pDABFAfzn0mlRzRqLpELlIhVk1e0lAodI4DFPvUwuOvepyleG7227AQzx6DUWCQU6-I45MqbKGciLgDcslhmdmCLtyidq9Wuo_duziMG6SmNjnr95DfoQUZobzdc2dxW-K_iLudJD-lPB6LYqdflD9sw1IrIcOg0WUsk7bp1YTMaAoXiOS0ys7pEondAeg.IyJTNVozXb1GGpkx.pxW-tlrp0LDgcg-CMUueJKQ36LxjN0c9EOYBWyfgtK4g9Q4hutshZ91SV5F0YWA8X96khBRJaJoZMI3eBhTj-B2Ajfz2U-QAwcx6mppNZnHQOkiX28uCWSGCquvl6pbuECuQVsxs0d1XBpA1FtJqmS88zpTHDnz4W94e_QvhpowD67BvKfqyBPdyzpbIHgm88PDHYRYzPbq5dM3ZtraCc0sz_KLK4x-fxYlTaTBI90gGwDJt1j8meAMTbtdW7X0fv4iQawBX21UB6xEzVnKhtFVySyxq4_GDoMeYp76EvEljtgwuGaLIw4wx0suICSpx524LnPhPmdD4spZ1QP7Bw8CEYPXvHi5NCcirgIy9f7DYjKDR5mG7Ca-smv-Erlbjlidraa2Grl0ly0ItsxqxLYS7zozey8Fh0WYrwPUIX3QyPLmctDLlZHaYALJcMI2AaXJ4wZH-Bn9KGBRbqhIlbXnnu51wSUh6m536U972iJdGB5F3p_Vh2E_T6AhjzOpYIcYqnF-TTfGLwdHELamNKq8nQNkTahpLeNDFpLWA_F2AVzQtb9MtPtYE9GLQlwB1b_jOd3W8UtsIuvlyIeMlnqukpBJM6s67VQGXZOws9jk8WhkIS80cZTZIe8ZeLq4ffcRoBrfuF0u16wlndT0bkylfGXnqhH6VADdaJqQXafm58ZDy-WKFCBcOOo4413P0ehCiPMBtNSzbC5PIkfq7pz7MtDrQ8pt_NaGnd_bNeIgCc84s6lB5x7r5S0ruTeeA2yMcSbhb28wxmBW8UCyM7InSH4e2465kSB-UOsGzbhJQYe0ZBEGLN5_91gLYuTXGAfYRQWaAbUDDxkZqXK_C_ShtUo7orGPt7St5D7_lzYekGpNuCNesJ1xObQlwsFzsQvItDFQmA3s2JAdf_EAfPtofz9VWeag4KkqjJB2CEQTtruO7VY7_2Zrx6QENhkgm9yji6cOe7wv3GF6FwUssE3oCe8XP0rX2HU3TQQcYVRHZPjmStRIVyB0GojIW3_jPvTUZI8PZMrSnn8jlhIabWLwfLsCbOztkTmcPpJxs6arvoG3sf1GVGlaI3oaPnN8hzptksZrNIta94kEX7_elq8z_OyVtPoE57ODgfUiHe1nximLhoacuEzw09oz_Q0S33wXhIcy7KnivZxRo6osrTulSPHIf9sNaEoAx5DO__sftVUrWrFWP3rs_f_-6tnLfo4NgbasBr1yadHIZCU7gWSCsmDMtzdYK0hO0SZ3Wzqh3UcxZuOe6KsQGzoMIriM7JlCmpoxe4F5ng36d523KS2TofpyKodQJLLN5w1CGfh_zaWj9bP5iOfQL6pyvOL76GFOUzi7bIU9yKcMn1Edc3gCTD11YAJBOOuN8KPAI-J6TNeDLdzMr0cazHqbcfVSEueKV-Bwvk578a0LB08rLsM9oes3Yf0uXiv4dkrmr.xUBhnq8T5PTKEJKVqOjTtg",
                "TokenType": "Bearer"
            },
            "ChallengeParameters": {}
        }
        */ 
    } catch(error) {
        
        console.log('original error ❌❌', error);
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

        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new AdminConfirmSignUpCommand({
            UserPoolId: process.env.AWS_USER_POOL_ID,
            Username: decoded.id
        });

        const response = await client.send(command);

        res.status(200).json(response);

        /*
        response format - 
        {
            "$metadata": {
                "httpStatusCode": 200,
                "requestId": "bfad74bc-8228-4bff-b18c-3520582c8a13",
                "attempts": 1,
                "totalRetryDelay": 0
            }
        }
    
        decoded jwt format -
        {
            id: '932ae7ba-594c-4208-a9be-bd717d1587e7',
            email: 'lakshanperera.dev@gmail.com',
            iat: 1658855828,
            exp: 1658942228
        }
        */ 
        /*
        note:
        redirect to login page
        */

    } catch (error) {

        console.log('original error ❌❌', error);
        
        if (error.name === 'TokenExpiredError') error.message = 'this url is only valid for 24hrs. visit freebie.xyz and try again';
        if (error.name === 'JsonWebTokenError') error.message = 'invalid url';

        next(error);
    }
});

// @desc get active user using access token
// @path GET /api/user
// @authorization private
router.get('/', async (req, res, next) => {
    try {
        // extract the access token from request header
        const accessToken = req.header('Authorization').split(' ')[1];

        const invalidAuthorizationError = new Error('authorization error');
        invalidAuthorizationError.name = 'InvalidAuthorization';

        // throw authorization error if token is not present
        if (!accessToken) throw invalidAuthorizationError;

        // get user from cognito
        const client = new CognitoIdentityProvider({
            region: process.env.AWS_COGNITO_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new GetUserCommand({
            AccessToken: accessToken 
        });

        const user = await client.send(command);

        res.status(200).json(user);

        /*
            response format -
            https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider/interfaces/getusercommandoutput.html
        */ 
        /*
        note: Secure authorization endpoints from CSRF vulnerbility
        */ 
        
    } catch (error) {

        console.log('original error ❌❌', error);

        next(error);
    }
});

// @desc refresh the access tokens
// @path POST /api/user/private/token
// @authorization private
router.post('/private/token', async (req, res, next) => {
    /*
    no access token is required since this endpoint since this endpoint uses to create new tokens
    */ 
    try {
        const { refreshToken } = req.body;

        // save user in cognito
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
                REFRESH_TOKEN: refreshToken,
            },
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID
        });

        const newTokens = await client.send(command);

        /*
            {
                "$metadata": {
                    "httpStatusCode": 200,
                    "requestId": "a67eea8c-7d1e-44af-acb1-e040f5499237",
                    "attempts": 1,
                    "totalRetryDelay": 0
                },
                "AuthenticationResult": {
                    "AccessToken": "eyJraWQiOiJCNnBoUmkyRFwvK2ExckRsV21MXC92UmdBRjJNSVl2MnF0R3Q3VEFGVUVqcjg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl80THpBNER5dEwiLCJjbGllbnRfaWQiOiI2dWR0YjBodnY4b2EycjZiMGxrY2htMmhucSIsIm9yaWdpbl9qdGkiOiJkZDIzZDYyMy1jYzdiLTQ1NjItOTQxZi03ZmE4ODcyMGQ2MWQiLCJldmVudF9pZCI6Ijc5ZjI3ODYxLWVlNGItNGQxNi1iNmE3LTlkMjQwNTVhYzA3OCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTkwMjY2OTMsImV4cCI6MTY1OTAzMTA3NiwiaWF0IjoxNjU5MDI3NDc2LCJqdGkiOiJjNTEzOTFmNi03NmVhLTQ5ZjctOTBhZS04OWUzZTg0ZTZjZjgiLCJ1c2VybmFtZSI6IjA3N2ExYzZmLTMxM2YtNDI4Zi04MjgzLTE0MmFkYmExOGI3ZSJ9.Zb6WtDyLRCsteYdciwH9y81tFxveJfBwbmrNUA5Zt1BFJAVjm3GEODucIsjbP59BqgzezjhLlB7Qb8yv13SaCb7O3ptqoY7dHX7-Kh-Bs7DUC7u__jMYf2a6Ky8Y6C6Hk7sU3kgkXnbrb4U56Iu09OaRBQUMRtq_mr1TV1oo-EOvDSnzX9PDikIvKL37mO1EJNZswGxE04BdyMyPMlEt-b1q2P8_NLT3X2G9PObxfmekjZxvtvhxX3tPGZ8ygkcAnKhGMJ1HRD795fFSDYRK705zss3mW0wpABsNz8e7jyMxEidsxKeRW74_-7RW87NzbDKHXpFTjwOVOv8rZc5lRQ",
                    "ExpiresIn": 3600,
                    "IdToken": "eyJraWQiOiI1VktYcGlId2FsSTZiMHhaMEFWcmhLd25HVG5KTHkzeFNhODJpbmVEVDZ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzRMekE0RHl0TCIsImNvZ25pdG86dXNlcm5hbWUiOiIwNzdhMWM2Zi0zMTNmLTQyOGYtODI4My0xNDJhZGJhMThiN2UiLCJvcmlnaW5fanRpIjoiZGQyM2Q2MjMtY2M3Yi00NTYyLTk0MWYtN2ZhODg3MjBkNjFkIiwiYXVkIjoiNnVkdGIwaHZ2OG9hMnI2YjBsa2NobTJobnEiLCJldmVudF9pZCI6Ijc5ZjI3ODYxLWVlNGItNGQxNi1iNmE3LTlkMjQwNTVhYzA3OCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjU5MDI2NjkzLCJleHAiOjE2NTkwMzEwNzYsImlhdCI6MTY1OTAyNzQ3NiwianRpIjoiOTYwOTZiODctMGI2OS00MGEwLWFkOGUtODVmYjNjYjdiMWQ5IiwiZW1haWwiOiJsYWtzaGFucGVyZXJhLmRldkBnbWFpbC5jb20ifQ.Fr9a2vCdCtF8Vu7suTDHVi8vUbI9Ntf8Ak01MEjBoz4CARK0XCzQ_M0pOoNhr4ho8ClRZj4XatHPSnB5DqxJdxz7Td9Kmhr2wv_bnkvCm8FlqHMBzqmhjwIcZP9p56nuN-Z2RIszKa-ozR3639hll6x6C7aCClbPg3OmhCkO95oMB_ztAI4tsUkTKV54rrgi8zCh67vq_sZ4Cx_b85A4aqtVZxRgNprC9vD7wjp1PQNSyr2ujotTJWvC1u3ooiUAOoInD9j37mQ-N6u6JVvFXBTH3ej99QoWxAWbDIe6xDpkTdAL4jx5ClmVSKXRCxNrC69yEZDyI0_gaJEEbwkcBg",
                    "TokenType": "Bearer"
                },
                "ChallengeParameters": {}
            }
        */ 

        res.status(200).json(newTokens);

        // if (refreshToken &&)
    } catch (error) {
        next(error);
    }
});

/*
refresh token snippet
app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})


router.post('/token', (req,res) => {
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "name": postData.name
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
})
*/ 

module.exports = router;
