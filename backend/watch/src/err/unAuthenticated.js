const { StatusCodes } = require("http-status-codes");
const CustomErrorApi = require("./customError");

class UnAthenticated extends CustomErrorApi {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

module.exports = UnAthenticated;
