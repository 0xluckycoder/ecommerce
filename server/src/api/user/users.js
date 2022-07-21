// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { CognitoIdentityProvider, SignUpCommand, CognitoIdentityProviderClient } = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');

const router = Router();

// const StoreEntry = require('../../models/StoreEntry');

router.get('/', async (req, res, next) => {

    try {
        const client = new CognitoIdentityProvider({
            region: 'us-west-2',
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        const command = new SignUpCommand({
            ClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
            Username: "lakshanperera625@gmail.com",
            Password: "7BuZ7YkV7JNxpwigiqi",
        });

        const response = await client.send(command);

        console.log(response);
        
    } catch (error) {

        console.log(error);

    }
});

router.get('/email', async () => {
    console.log('starting');
    try {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth : {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const info = await transporter.sendMail({
            from: "freebie <freebiesell@gmail.com>",
            to: "lakshanperera.dev@gmail.com",
            subject: "Freebie Subject",
            text: "Hello World",
            html: "<h1>this is html text </h1>"
        });

        console.log("Message is sent ", info.messageId);

        console.log("Preveiw URL", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res, next) => {
    // try {
    //     const storeEntry = new StoreEntry(req.body);
    //     const createdEntry = await storeEntry.save();
    //     res.json(createdEntry);
    // } catch (error) {
    //     next(error);
    // }
});

module.exports = router;
