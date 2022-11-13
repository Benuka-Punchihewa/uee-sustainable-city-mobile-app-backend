const BadRequestError = require("../error/error.classes/BadRequestError");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * Reads page, limit, orderBy attributes in the req.query
 * creates an object called and add it to request body with key pageable
 * 
 */
const paginate = (req, res, next) => {
  const { page, limit, orderBy } = req.query;
  if (!page) throw new BadRequestError("Page number is required!");
  if (!limit) throw new BadRequestError("Limit is required!");
  if (!orderBy) throw new BadRequestError("OrderBy is required!");

  req.body.pageable = { page, limit, orderBy };
  next();
};

module.exports = {
  paginate,
};
