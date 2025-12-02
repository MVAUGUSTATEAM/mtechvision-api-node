module.exports = (router) => {
  router.post('/mugello/telemetry', (req, res) => {
    res.json({
      status: "ok",
      module: "telemetry",
      message: "Telemetry placeholder received"
    });
  });

  router.get('/mugello/telemetry', (req, res) => {
    res.json({
      status: "ok",
      module: "telemetry",
      message: "Telemetry fetch placeholder"
    });
  });
};
