const Server = require('./server');

const instance = new Server({
  port: 8080,
  environment: 'local',
});

instance.start();
