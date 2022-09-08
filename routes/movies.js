const router = require("express").Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require("../middlewares/validators");
const { authMiddleware } = require("../middlewares/auth");

router.use(authMiddleware);
router.get("/", getMovies);
router.post("/", validateCreateMovie, createMovie);
router.delete("/:movieId", validateDeleteMovie, deleteMovie);

module.exports = router;
