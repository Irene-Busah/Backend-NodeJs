const { constants } = require('../constants');
/**
 *
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation error", message: err.message, stack: err.stack })
            break;
        case constants.NOT_FOUND:
            res.json({ title: "Not found", message: err.message, stack: err.stack })
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: err.message, stack: err.stack })
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: err.message, stack: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stack: err.stack })
        default:
            console.log("No error")
            break;
    }


}

module.exports = errorHandler;
