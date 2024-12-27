const jwt = require("jsonwebtoken");
const { CustomErrorApi } = require("../err/index");

const authorizationMidd = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new CustomErrorApi("No token provided");
  }
  const token = authHeaders.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, userName } = decoded;
    req.user = { userId, userName };
    next();
  } catch (error) {
    throw new CustomErrorApi("Not authrozation to access this route");
  }
};

module.exports = authorizationMidd;