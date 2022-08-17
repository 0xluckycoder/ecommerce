const authService = require('../services/authService');
const yup = require('yup');

const signUp = async (req, res, next) => {
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
        const signedUpResponse = await authService.signUp(validated);

        // success response
        res.status(200).json({
            success: true,
            data: signedUpResponse
        });

    } catch(error) {
        console.log('original error ❌❌', error);
        next(error);
    }
}

const signIn = () => {

}

const confirmEmail = () => {

}

const verifyAuth = () => {

}

module.exports = {
    signUp,
    signIn,
    confirmEmail,
    verifyAuth
}