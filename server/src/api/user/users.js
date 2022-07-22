// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { CognitoIdentityProvider, SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');
const Joi = require('joi');

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
        // validate email and password
        const data = req.body;

        /* validate with express-validator */ 

        // console.log(data);

        // const userSchema = Joi.object({
        //     email: Joi.string()
        //             .email()
        //             .required(),
        //     password: Joi.string()
        //             .min(7)
        //             .max(12)
        //             .required()
        //             .error((errors) => {
        //                 console.log(errors);
        //             })
        // });

        // const { error, value } = userSchema.validate(data, userSchema);

        // if (error) {
        //     console.log('validation error', error);
        // } else {
        //     console.log('the value', value);
        // }


    } catch(error) {
        console.log('errr', error);
    }
});

module.exports = router;
