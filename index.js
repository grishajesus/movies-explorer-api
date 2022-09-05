require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const { limiterMiddleware } = require("./middlewares/limiter");
const { errorMiddleware } = require("./middlewares/error");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const router = require("./routes/routes");
const { PORT, DATABASE_URL } = require("./config");

const app = express();

app.use(requestLogger);
app.use(limiterMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

mongoose.connect(DATABASE_URL);
app.listen(PORT);
