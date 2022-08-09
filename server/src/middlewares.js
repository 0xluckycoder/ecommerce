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
    CodeDeliveryFailureException: 400,
    JsonWebTokenError: 400,
    TokenExpiredError: 400,
    NotBeforeError: 400,
    InvalidAuthorization: 401, // custom error name,
    CookiesUnavailable: 400 // custom error name
}

// const notFound = (req, res, next) => {
//     const error = new Error(`Not found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// }


/*
app.get('/productswitherror', (request, response) => {
  let error = new Error(`processing error in request at ${request.url}`)
  error.statusCode = 400
  throw error
})

guide - https://reflectoring.io/express-error-handling/
*/

const errorHandler = (error, req, res, next) => {

    // assign the status code
    const statusCode = errorTypes[error.name] ? errorTypes[error.name] : 500;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'error stack is hidden in production' : error.stack
    });
}

module.exports = {
    // notFound,
    errorHandler
}