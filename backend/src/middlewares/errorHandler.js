const errorHandling = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 400; // Default to 400 for our custom thrown errors
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal Server Error',
    });
}

export default errorHandling;