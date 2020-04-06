const Server = require('./server');

const instance = new Server({
  port: 3000,
  environment: 'development'
})

instance.start();
