require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");

const router = require("./routes/routes");
const { limiterMiddleware } = require("./middlewares/limiter");
const { errorMiddleware } = require("./middlewares/error");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT, DATABASE_URL } = require("./config");

mongoose.connect(DATABASE_URL);

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

app.listen(PORT);
