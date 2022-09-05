const Movie = require("../models/movie");
const NotFoundError = require("../utils/NotFoundError");
const BadRequestError = require("../utils/BadRequestError");
const ForbiddenError = require("../utils/ForbiddenError");

const getMovies = async (_, res, next) => {
  try {
    const movies = await Movie.find({});

    return res.send(movies.reverse());
  } catch (error) {
    return next(error);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });

    return res.send(movie);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new BadRequestError("wrong data movie"));
    }

    return next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId).orFail(
      () => new NotFoundError("movie not found")
    );

    if (!movie.owner.equals(req.user._id)) {
      throw new ForbiddenError("access error");
    } else {
      const deletedMovie = await movie.remove();

      return res.send({ message: deletedMovie });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return next(new BadRequestError("wrong data movie delete"));
    }

    return next(error);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
