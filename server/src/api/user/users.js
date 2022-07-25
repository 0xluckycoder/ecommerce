// const { CognitoIdentityProvider, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const { CognitoIdentityProvider, SignUpCommand } = require('@aws-sdk/client-cognito-identity-provider')

const { Router } = require('express');
const nodemailer = require('nodemailer');
const yup = require('yup');
const { validate } = require('../../models/StoreEntry');

const router = Router();

// const StoreEntry = require('../../models/StoreEntry');


router.post('/signup', async (req, res, next) => {
    console.log('came here')
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

        const response = await client.send(command);

        // success response
        res.status(200).json({
            success: true,
            userInfo: validated,
            cognitoInfo: response
        });

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

    } catch(error) {
        console.log('errr', error);

        // if expected error type is not present in here throw 500 error type
        const errorTypes = {
            ValidationError: 400,
            UsernameExistsException: 400,
            UserLambdaValidationException: 400,
            UnexpectedLambdaException: 400,
            TooManyRequestsException: 400,
            ResourceNotFoundException: 400,
            NotAuthorizedException: 400,
            InvalidSmsRoleTrustRelationshipException: 400,
            InvalidSmsRoleAccessPolicyException: 400,
            InvalidPasswordException: 400,
            InvalidParameterException: 400,
            InvalidLambdaResponseException: 400,
            InvalidEmailRoleAccessPolicyException: 400,
            InternalErrorException: 400,
            CodeDeliveryFailureException: 400
        }

        // assign the status code
        const statusCode = errorTypes[error.name] ? errorTypes[error.name] : 500;

        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? 'error stack is hidden in production' : error.stack
        });

        // next(error);
    }
});

router.post('/confirmEmail', async (req, res, next) => {
    /*
    {
        "email",
        "password"
    }
    */ 
    try {
        // nodemailer config
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth : {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.PASSWORD
            }
        });
        
        const info = await transporter.sendMail({
            from: "freebie <freebiesell@zohomail.com>",
            to: "lakshanperera.dev@gmail.com",
            subject: "Freebie Subject",
            html: "<h1>this is html text </h1>"
        });

        console.log("Message is sent ", info);

        console.log("Preveiw URL", nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
