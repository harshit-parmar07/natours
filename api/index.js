const mongoose = require('mongoose');
const dotenv = require('dotenv');
const serverless = require('serverless-http');

// Handle uncaught exceptions globally
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting down....');
  console.log(err.name, err.message);
  process.exit(1);
});

// Load environment variables
dotenv.config({ path: './config.env' });

// Import your Express app
const app = require('../app'); // Adjust path since this will be in /api/index.js

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'));

module.exports = serverless(app);
// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION Shutting down....');
  process.exit(1);
});
