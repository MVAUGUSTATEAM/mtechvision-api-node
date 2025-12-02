const express = require('express');

const authModule = require('./auth');
const sessionModule = require('./session');
const telemetryModule = require('./telemetry');
const configModule = require('./config');

module.exports = () => {
  const router = express.Router();

  // Attach each module to the shared router
  authModule(router);
  sessionModule(router);
  telemetryModule(router);
  configModule(router);

  return router;
};
