const authService = require('./services/authService');

const errorHandler = (error, req, res, next) => {

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
        CookiesUnavailable: 400, // custom error name
        NotFound: 404, // custom error name
        ValidationFailed: 400 // custom error name
    }

    // assign the status code
    const statusCode = errorTypes[error.name] ? errorTypes[error.name] : 500;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'error stack is hidden in production' : error.stack
    });
}

const authorizeRequest = async (req, res, next) => {

    const { AccessToken, RefreshToken, IdToken } = req.cookies;
    
    try {
        // validate cookies
        if (!AccessToken || !RefreshToken || !IdToken) {
            const tokenUnavailableError = new Error('no cookies available');
            tokenUnavailableError.name = 'CookiesUnavailable';            
            throw tokenUnavailableError;
        }

        const verifyAuthResponse = await authService.verifyAuth(req.cookies);

        // assign user data to req object
        req.userData = verifyAuthResponse;

        next();

    } catch (error) {
        /**
         * if access token is expired reassign new access & id tokens to client
         * if access token is invalid throw error
         * */ 

            if (error.name === 'NotAuthorizedException') {

            console.log('refreshing the access/id token');
                
            try {
                const refreshedTokens = await authService.refreshTokens(RefreshToken);
                const cookiesConfig = {
                    maxAge: 60000 * 60,
                    httpOnly: true
                }

                const cookies = {
                    AccessToken: refreshedTokens.AuthenticationResult.AccessToken,
                }
                const verifyAuthResponse = await authService.verifyAuth(cookies);

                // clear existing token cookies
                res.clearCookie('AccessToken');
                res.clearCookie('IdToken');
    
                // reassign new access & id token cookies
                res.cookie('AccessToken', refreshedTokens.AuthenticationResult.AccessToken, cookiesConfig);
                res.cookie('IdToken', refreshedTokens.AuthenticationResult.IdToken, cookiesConfig);
                
                req.userData = verifyAuthResponse;
                return next();
    
            } catch (error) {
                next(error);
            }
            /*
                {
                    '$metadata': {
                        httpStatusCode: 200,
                        requestId: 'eab1f0d9-3051-4404-85f1-fa5e8a8b2dd1',
                        extendedRequestId: undefined,
                        cfId: undefined,
                        attempts: 1,
                        totalRetryDelay: 0
                    },
                    AuthenticationResult: {
                        AccessToken: 'eyJraWQiOiJCNnBoUmkyRFwvK2ExckRsV21MXC92UmdBRjJNSVl2MnF0R3Q3VEFGVUVqcjg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl80THpBNER5dEwiLCJjbGllbnRfaWQiOiI2dWR0YjBodnY4b2EycjZiMGxrY2htMmhucSIsIm9yaWdpbl9qdGkiOiI4YTcxN2IxYy03YmY2LTQ1YWItOWMyYS01YmMxMTdkMjAyZGMiLCJldmVudF9pZCI6IjdiMjczODM5LTgwYmQtNDU4OS1iYmE3LWFmNjQ1YmI2MWM4OSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NjAwNzUwMjksImV4cCI6MTY2MDA3ODYzNywiaWF0IjoxNjYwMDc1MDM3LCJqdGkiOiI1YzE0MjAyYy00MjUxLTRkODUtYTUzMC1iNzA1OGEzOTg4YmUiLCJ1c2VybmFtZSI6IjBiOWMwYjU4LWQ2OGYtNDZmZC04NTk1LTYxMmFjODBhZjJlZiJ9.TW8Hj86jzjeXEB4SpBZGzvjrHek3xqohTidWIi5baLkTNeBhSpFETL8YpN7DslK-0JsovFs3-Gm-zkzMbMrmhO1_ElOiXtsrcvqjcbya9nia7cIhbionbYhv3Tnq-9_r4ZWD-0qPNF5skiYii579sDIfR6QoTk2GgqZOSW4YCFQ9RmIrmXGLglRF88V-eJUDVUYCOPfQa8RcaMk1MfqWoN4eOP_NPZPd1TEMs3oobP06aXQ7H7n7rH9mTZ9htxwDvtcwCMvq-PxTTO8QdpcYb9DiJY2WWLiHE7vQXJsvNDcvkxxbQ87gJiq7DTBdiR9C4sFyAGuOF4VUJWe2AUDOfA',
                        ExpiresIn: 3600,
                        IdToken: 'eyJraWQiOiI1VktYcGlId2FsSTZiMHhaMEFWcmhLd25HVG5KTHkzeFNhODJpbmVEVDZ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yXzRMekE0RHl0TCIsImNvZ25pdG86dXNlcm5hbWUiOiIwYjljMGI1OC1kNjhmLTQ2ZmQtODU5NS02MTJhYzgwYWYyZWYiLCJvcmlnaW5fanRpIjoiOGE3MTdiMWMtN2JmNi00NWFiLTljMmEtNWJjMTE3ZDIwMmRjIiwiYXVkIjoiNnVkdGIwaHZ2OG9hMnI2YjBsa2NobTJobnEiLCJldmVudF9pZCI6IjdiMjczODM5LTgwYmQtNDU4OS1iYmE3LWFmNjQ1YmI2MWM4OSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYwMDc1MDI5LCJleHAiOjE2NjAwNzg2MzcsImN1c3RvbTpyb2xlIjoidmVuZG9yIiwiaWF0IjoxNjYwMDc1MDM3LCJqdGkiOiJlMTU2NmU0Ny05M2ZlLTRkOWYtYTQwMi05ZGU1ODNmZjljZTQiLCJlbWFpbCI6Imxha3NoYW5wZXJlcmEuZGV2QGdtYWlsLmNvbSJ9.RAtmkZq3Qnd2GMt7o9aDJrjIxRtUvsf9ZRQ_lwwxPoCKgbQ-TrM83D1Vs-e8dKQTPA0q-A4O4S9XdMndTUFFqtCsvPXznPSTkhofA9JNpHqFFVzbxy9FnepMh8dgD2D8aN9JALq4sFnuw0eOwxLqwqjgEMT3e5ED-TYM0x1h5TqCBBnCo-EgbfBByP3Y35zjMjn6q3E4voQbXKcDQ3dGy3jVDNvwD82lfeDFV7DsUfEKKKzai9MAvkqfnAKHHreiqxbLcyKWMpt7hbJJq1GKUfE4-nOqHruUziH9lAjmR0T3EtG18AE3ck1t-UaFFnyfsFPX_MCIi7Zt7WpPgJin7A',
                        NewDeviceMetadata: undefined,
                        RefreshToken: undefined,
                        TokenType: 'Bearer'
                    },
                    ChallengeName: undefined,
                    ChallengeParameters: {},
                    Session: undefined
                }
            */ 
        }

        console.log('original error ❌❌', error);
        next(error);
    }
}

/*

Creating private routes

 - [x] - identify owner by reading cookies
 - [x] - pass the authenticated user's details to req object
 - [x] - check the verbs and api structure again


    - [x] - handle the refresh behaviour properly   
        - [x] - test private endpoint with middleware
        - [x] - learn the middleware execution flow with errors and success messages
            - [x] - testing attempt with success
            - [x] - testing attempt with error failure
    - [x] - Read about token handling
    - [x] - authorize accesstoken & id token in a standard way
    - [x] - read more about authorize aws endpoints (from previous git comments and sdk)
    - [x] - assign auth users details to req object

    - use verify auth function as middleware (keep the endpoint and just call the function)

    - id - identity token
    - access token - authorize access to secure api calls
    - refresh token - refresh auth tokens once they expire

    verify auth endpoint mainly used for persist authentication between browser refreshs

*/ 


module.exports = {
    // notFound,
    errorHandler,
    authorizeRequest
}