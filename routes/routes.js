const router = require("express").Router();

const { createUser, login } = require("../controllers/user");
const { authMiddleware } = require("../middlewares/auth");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validators");
const NotFoundError = require("../utils/NotFoundError");
const userRoutes = require("./user");
const moviesRoutes = require("./movies");

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);

router.use("/users", userRoutes);
router.use("/movies", moviesRoutes);

router.use(authMiddleware);
router.use("*", (req, _, next) => {
  next(new NotFoundError(`url not found - ${req.originalUrl} `));
});

module.exports = router;
