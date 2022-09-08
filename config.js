module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "default-key",
  DATABASE_URL:
    process.env.DATABASE_URL || "mongodb://0.0.0.0:27017/bitfilmsdb",
};
