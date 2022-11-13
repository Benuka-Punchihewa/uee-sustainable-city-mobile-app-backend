const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service");
const authUtil = require("./auth.util");
const bcrypt = require("bcryptjs");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");
const BadRequestError = require("../error/error.classes/BadRequestError");
const NotFoundError = require("../error/error.classes/NotFoundError");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns HTTP JSON Response
 *
 * Logins user
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  // validations
  if (!password || !username) throw new BadRequestError("Both Username & Password are Required!");

  // check for existence
  const dbAuth = await authService.findById(username);
  if (!dbAuth) throw new NotFoundError("User Not Found!");

  //compare the passwords
  const passwordCompare = await bcrypt.compare(
    password,
    String(dbAuth.password)
  );
  if (!passwordCompare) throw new UnauthorizedError("Bad Credentials!");

  // populate user
  const dbPopulatedAuth = await dbAuth.populate("user");

  // sign token
  const token = authUtil.signToken(dbPopulatedAuth.user);

  return res
    .status(StatusCodes.OK)
    .json({ message: "Login successfull!", user: dbPopulatedAuth.user, token });
};

module.exports = { login };
