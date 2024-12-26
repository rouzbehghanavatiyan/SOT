class CustomErrorApi extends Error {
  constructor(message) {
    super(message);
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomErrorApi(msg, statusCode)
}

module.exports = CustomErrorApi;