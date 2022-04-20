const errorHandler = (err, req, res, next) => {
    const deployType = "development";  //this would normally come from an .env file
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: deployType === "production" ? null : err.stack
    });
};

module.exports = {
    errorHandler
};