const express = require('express');

const commerceController = require('./controllers/commerce');

class Server {
  constructor(config) {
    this.port = config.port;
    this.environment = config.environment;
  }

  start() {
    const app = express();

    app.use(commerceController);

    app.listen(this.port, () => console.log('Started listening')); // eslint-disable-line

    return app;
  }
}

module.exports = Server;
