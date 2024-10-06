// db/db.js
require('dotenv').config();
const { Client } = require('pg');

// Database connection setup using environment variables
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect();

module.exports = client;
