module.exports = (router) => {
  router.post('/auth/login', (req, res) => {
    res.json({
      status: "ok",
      module: "auth",
      action: "login",
      message: "Auth module placeholder"
    });
  });

  router.post('/auth/refresh', (req, res) => {
    res.json({
      status: "ok",
      module: "auth",
      action: "refresh",
      message: "Token refresh placeholder"
    });
  });

  router.get('/auth/verify', (req, res) => {
    res.json({
      status: "ok",
      module: "auth",
      action: "verify",
      message: "Token verify placeholder"
    });
  });
};
