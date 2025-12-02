module.exports = (router) => {
  router.post('/mugello/session/start', (req, res) => {
    res.json({
      status: "ok",
      module: "session",
      action: "start",
      message: "Session start placeholder"
    });
  });

  router.post('/mugello/session/end', (req, res) => {
    res.json({
      status: "ok",
      module: "session",
      action: "end",
      message: "Session end placeholder"
    });
  });

  router.get('/mugello/session/status', (req, res) => {
    res.json({
      status: "ok",
      module: "session",
      action: "status",
      message: "Session status placeholder"
    });
  });
};
