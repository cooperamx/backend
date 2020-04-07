const Server = require('./server');

const instance = new Server({
  port: 8080,
  environment: process.env.ENVIRONMENT,
});

instance.start();
