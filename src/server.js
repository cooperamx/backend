const express = require('express');
const bodyParser = require('body-parser');
const { Datastore } = require('@google-cloud/datastore');

const CommerceController = require('./controllers/commerce');
const CommerceRepository = require('./repositories/commerce');


class Server {
  constructor(config) {
    this.port = config.port;
    this.environment = config.environment;
  }

  start() {
    const app = express();
    const commerceRepository = new CommerceRepository(
      new Datastore({ namespace: this.environment }),
    );
    const commerceController = CommerceController(commerceRepository);

    app.use(bodyParser.json());

    app.get('/', (req, res) => res.send('Hello World'));
    app.use('/api/v1/commerces', commerceController);

    app.listen(this.port, () => console.log('Started listening')); // eslint-disable-line

    return app;
  }
}

module.exports = Server;
