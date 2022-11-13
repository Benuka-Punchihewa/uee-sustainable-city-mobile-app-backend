// import libraries
const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("express-async-errors");

// import middleware
const errorHandlerMiddleware = require("./modules/error/error.middleware");

// import errors
const NotFoundError = require("./modules/error/error.classes/NotFoundError");

// import configs
const commonConfig = require("./modules/common/common.config");
const constants = require("./constants");

// import routes
const AuthRoutes = require("./modules/auth/auth.route");
const UserRoutes = require("./modules/user/user.route");

const app = express();

app.use(express.json());
app.use(cors());

// define routes
app.use(constants.API.PREFIX.concat("/auth"), AuthRoutes);
app.use(constants.API.PREFIX.concat("/users"), UserRoutes);

// not found route
app.use((req, res, next) => {
  throw new NotFoundError("API Endpoint Not Found!");
});

// error handler middleware
app.use(errorHandlerMiddleware);

/**
 * connect to database and run application on defined port
 */
const start = async () => {
  const port = process.env.PORT || constants.PORT;
  try {
    await commonConfig.connectDB();
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}...`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
