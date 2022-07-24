// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { CognitoIdentityProvider, SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');
const yup = require('yup');

const router = Router();

// const StoreEntry = require('../../models/StoreEntry');

// router.get('/', async (req, res, next) => {

//     try {
//         const client = new CognitoIdentityProvider({
//             region: 'us-west-2',
//             credentials : {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//             },
//         });

//         const command = new SignUpCommand({
//             ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
//             Username: "lakshanperera625@gmail.com",
//             Password: "7BuZ7YkV7JNxpwigiqi",
//         });

//         const response = await client.send(command);

//         console.log(response);
        
//     } catch (error) {

//         console.log(error);

//     }
// });

// router.get('/email', async () => {
//     console.log('starting');
//     try {
//         const transporter = nodemailer.createTransport({
//             host: "smtp.zoho.com",
//             port: 465,
//             secure: true,
//             auth : {
//                 user: process.env.EMAIL_ADDRESS,
//                 pass: process.env.PASSWORD
//             }
//         });

//         const info = await transporter.sendMail({
//             from: "freebie <freebiesell@zohomail.com>",
//             to: "lakshanperera.dev@gmail.com",
//             subject: "Freebie Subject",
//             html: "<h1>this is html text </h1>"
//         });

//         console.log("Message is sent ", info);

//         console.log("Preveiw URL", nodemailer.getTestMessageUrl(info));
//     } catch (error) {
//         console.log(error);
//     }
// });

router.post('/signup', async (req, res, next) => {
    console.log('came here')
    try {
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

        res.json(validated);
/* 
        const client = new CognitoIdentityProvider({
            region: 'us-west-2',
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: value.email,
            Password: value.password,
        });

        const response = await client.send(command);
*/

        /*
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

        res.json(response);

    } catch(error) {
        console.log('errr', error);
        next(error);
    }
});

module.exports = router;
