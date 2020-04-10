const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Datastore } = require('@google-cloud/datastore');

const CommerceController = require('./controllers/commerce');
const CheckoutController = require('./controllers/checkout');

const CommerceRepository = require('./repositories/commerce');
const CheckoutRepository = require('./repositories/checkout');

class Server {
  constructor(config) {
    this.port = config.port;
    this.environment = config.environment;
  }

  start() {
    const app = express();
    const dataStore = new Datastore({ namespace: this.environment });

    const commerceRepository = new CommerceRepository(dataStore);
    const checkoutRepository = new CheckoutRepository(dataStore);

    const commerceController = CommerceController(commerceRepository);
    const checkoutController = CheckoutController(checkoutRepository);

    app.use(bodyParser.json());
    app.use(cors());

    app.get('/', (req, res) => res.send('Hello World'));
    app.use('/api/v1/commerces', commerceController);
    app.use('/api/v1/checkout', checkoutController);

    app.listen(this.port, () => console.log('Started listening')); // eslint-disable-line

    return app;
  }
}

module.exports = Server;
