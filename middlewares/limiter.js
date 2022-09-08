const rateLimit = require("express-rate-limit");

const limiterMiddleware = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

module.exports = { limiterMiddleware };
