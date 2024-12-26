const { StatusCodes } = require('http-status-codes');
const CustomErrorApi = require('../err/customError');

const errorHandler = (err, req, res, next) => {
    return console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error")
    // if (err instanceof CustomErrorApi) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    // }
    // else {
    //     next(err)
    // }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error")
}

module.exports = errorHandler;