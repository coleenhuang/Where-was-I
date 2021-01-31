const { dirname } = require('path');

require('dotenv').config();

const db = (process.env.NODE_ENV === 'test') ? process.env.TEST_DB_DATABASE: process.env.DB_DATABASE;
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${db}`

module.exports = {
"migrationsDirectory": __dirname + "/migrations",
  "driver": "pg",
  "connectionString": connectionString
  }