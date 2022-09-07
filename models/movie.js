const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {},
  trailerLink: {},
  thumbnail: {},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  movieId: {},
  nameRU: {},
  nameEN: {},
});

module.exports = mongoose.model("movie", movieSchema);
