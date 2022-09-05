const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");
const User = require("../models/user");
const NotFoundError = require("../utils/NotFoundError");
const BadRequestError = require("../utils/BadRequestError");
const ConflictError = require("../utils/ConflictError");

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(
      () => new NotFoundError("user not found")
    );

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    ).orFail(() => new NotFoundError("user not found"));

    return res.send(updatedUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequestError("wrong user data"));
    }

    if (error.code === 11000) {
      return next(new ConflictError("email allready exists"));
    }

    return next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    return res.send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequestError("wrong user data"));
    }

    if (error.code === 11000) {
      return next(new ConflictError("email allready exists"));
    }

    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.send({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCurrentUser,
  updateUser,
  createUser,
  login,
};
