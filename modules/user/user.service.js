const User = require("./user.model");

/**
 *
 * @param {*} auth -> Auth Object
 * @param {*} session -> MongoDB Client Session
 * @returns Promise
 */
const save = async (user, session) => {
  return await user.save({ session });
};

/**
 *
 * @param {*} userId -> User's ID
 * @returns Promise
 *
 * Finds the User with passed user ID
 */
const findById = async (userId) => {
  return await User.findById(userId);
};
// exports
module.exports = { save, findById };
