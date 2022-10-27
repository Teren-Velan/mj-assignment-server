//cors config
const express = require("express");
const cors = require("cors");
const app = express();
const allowedOrigins = [
  "https://mighty-assignment.netlify.app",
  "https://mighty-assignment.netlify.app/",
  "http://localhost:3000",
  "http://localhost:3000/",
];

let corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (allowedOrigins.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
