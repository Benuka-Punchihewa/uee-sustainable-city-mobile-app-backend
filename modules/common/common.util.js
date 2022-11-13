const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const constants = require("../../constants");
const fs = require("fs");

/**
 *
 * @param {*} error -> ERROR
 *
 * Gets error passed to the logger and logs internal server errors
 */
const logger = async (error) => {
  const date = new Date();

  // create a new file for each day
  const fileName = `${moment(date).format("YYYY-MM-DD")}.log`;
  const file = `${constants.LOGS.FILE_PATH}/${fileName}`;

  // ignore non internal server errors
  if (error.statusCode !== StatusCodes.INTERNAL_SERVER_ERROR) return;

  // error content
  const content = `${new Date().toISOString()} | ${error?.message}\n`;

  // create a dir if does not exist
  fs.mkdir(constants.LOGS.FILE_PATH, { recursive: true }, (err) => {
    if (err) console.error(err);
  });

  // Append to file
  fs.appendFile(file, content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = { logger };
