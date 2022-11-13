const Auth = require("./auth.model");

/**
 *
 * @param {*} auth -> Auth Object
 * @param {*} session -> MongoDB Client Session
 * @returns Promise
 */
const save = async (auth, session) => {
  return await auth.save({ session });
};

/**
 *
 * @param {*} id -> Auth ID
 * @param {*} session -> MongoDB Client Session
 * @returns Promise
 */
const findById = async (id, session) => {
  if (session) return await Auth.findById(id).session(session);
  return await Auth.findById(id);
};

// exports
module.exports = { save, findById };
