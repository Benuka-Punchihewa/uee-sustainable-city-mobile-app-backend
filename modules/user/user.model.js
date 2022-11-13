const mongoose = require("mongoose");
const constants = require("../../constants");

/**
 * MongoDB model for user documents
 */
const UserModel = mongoose.Schema(
  {
    _id: {
      type: String,
      maxlength: [50, "ID Should Not Exceed 50 Characters!"],
    },
    name: {
      type: String,
      required: [true, "Name is Required!"],
      maxlength: [100, "Name Should Not Exceed 50 Characters!"],
    },
    role: {
      type: String,
      required: [true, "User Role is Required!"],
      enum: {
        values: [
          constants.USER.ROLES.ADMIN,
          constants.USER.ROLES.GARBAGE_COLLECTOR,
          constants.USER.ROLES.METER_READER,
          constants.USER.ROLES.CITIZEN,
        ],
        message: "Valid Role is Required!",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserModel);
