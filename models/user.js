const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const ApiError = require("../utils/ApiError");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: "Некорректный email.",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new ApiError({
            statusCode: 401,
            message: "Неправильные почта или пароль",
          })
        );
      }

      return bcrypt.compare(password, user.password).then((isEqualPassword) => {
        if (!isEqualPassword) {
          return Promise.reject(
            new ApiError({
              statusCode: 401,
              message: "Неправильные почта или пароль",
            })
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
