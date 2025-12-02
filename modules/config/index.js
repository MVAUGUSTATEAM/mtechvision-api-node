module.exports = (router) => {
  router.get('/cloud/config', (req, res) => {
    res.json({
      status: "ok",
      module: "config",
      config_version: "1.0",
      message: "Cloud config placeholder"
    });
  });

  router.get('/cloud/config/version', (req, res) => {
    res.json({
      status: "ok",
      module: "config",
      config_version: "1.0",
      message: "Config version placeholder"
    });
  });
};
