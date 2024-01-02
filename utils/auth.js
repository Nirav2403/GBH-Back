const jwt = require("jsonwebtoken");
const config = require("../config/appConfig");

const generateToken = (payload) => {
  return jwt.sign({ payload }, config.auth.jwt_secret, {
    expiresIn: config.auth.jwt_expiresin,
    algorithm: "HS512",
  });
};

module.exports = {
  generateToken,
};
