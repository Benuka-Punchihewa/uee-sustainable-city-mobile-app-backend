const { StatusCodes } = require("http-status-codes");
const constants = require("../../constants");
const Auth = require("../auth/auth.model");
const User = require("./user.model");
const AuthUtil = require("../auth/auth.util");
const UserService = require("./user.service");
const AuthService = require("../auth/auth.service");
const { startSession } = require("mongoose");
const BadRequestError = require("../error/error.classes/BadRequestError");
const { v4: UUIDV4 } = require("uuid");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns HTTP JSON Response
 *
 * Creates User
 */
const createUser = async (req, res) => {
  const { password } = req.body;

  // validate password
  if (!password) throw new BadRequestError("Password Cannot be Empty!");

  // construct user document
  const user = new User(req.body);

  // construct auth
  const auth = new Auth();
  auth._id = user._id;
  auth.password = await AuthUtil.getEncryptedPassword(password);
  auth.user = user;

  let dbUser = null;

  // start mongoose default session
  const session = await startSession();

  try {
    // start transaction for the session
    session.startTransaction();

    //save the user
    dbUser = await UserService.save(user, session);
    await AuthService.save(auth, session);

    // commit transaction
    await session.commitTransaction();
  } catch (err) {
    // abort transaction
    await session.abortTransaction();
    throw err;
  } finally {
    // end session
    await session.endSession();
  }

  return res.status(StatusCodes.CREATED).json({
    message: "User Created Successfully!",
    object: dbUser,
  });
};

// controller exports
module.exports = { createUser };
