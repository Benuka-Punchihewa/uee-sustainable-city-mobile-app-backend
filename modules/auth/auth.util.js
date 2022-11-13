const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 *
 * @param {*} user -> User Object
 * @returns JWT Token
 *
 * Signs JWT Token using JWT Secret Key
 */
const signToken = (user) => {
  const maxAge = 30 * 24 * 60 * 60; // 30d

  const tokenBody = {
    _id: user._id,
    role: user.role,
  };

  return jwt.sign(tokenBody, String(process.env.JWT_SECRET), {
    expiresIn: maxAge,
  });
};

/**
 *
 * @param {*} bearerToken -> Bearer Token
 * @returns JWT Token
 *
 * Extacts JWT Token from Bearer Token
 */
const extractToken = (bearerToken) => {
  const bearerArr = bearerToken.split(" ");
  if (bearerArr.length !== 2) return null;
  return bearerArr[1];
};

/**
 *
 * @param {*} password
 * @returns Hashed Password
 *
 * Encrypts password
 */
const getEncryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { signToken, extractToken, getEncryptedPassword };
