const CustomErrorApi = require("./customError");
const { StatusCode } = require("http-status-codes");

class BadRequest extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.BAD_REQUEST
  }
}

module.exports = BadRequest;