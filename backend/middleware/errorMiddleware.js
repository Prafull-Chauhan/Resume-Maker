const errorHandler = (err, req, res, next) => {
    console.error('Server Error:', err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Not Found - [${req.method}] ${req.originalUrl}`
    });
};

module.exports = { errorHandler, notFoundHandler };