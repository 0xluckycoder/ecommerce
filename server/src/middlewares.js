// const errorTypes = {
//     validationError: 400,
// }

// const notFound = (req, res, next) => {
//     const error = new Error(`Not found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
// }

// const errorHandler = (error, req, res, next) => {
//     // const statusCode = res.statusCode === 200 ? errorTypes[error.name] || : res.statusCode;
//     let statusCode;
//     if (res.statusCode === 200) {
//         if (!errorTypes[error.name]) {
//             statusCode = 500;
//         } 
//     }
//     res.status(statusCode);
//     res.json({
//         message: error.message,
//         stack: 'production'
//     })
// }

// module.exports = {
//     notFound,
//     errorHandler
// }