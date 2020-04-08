const Server = require('./server');

const port = process.env.PORT || 8080;

const server = new Server({
  port,
  environment: process.env.ENVIRONMENT,
});

server.start();
