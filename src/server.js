class Server {
  constructor (config) {
    this.port = config.port
    this.environment = config.environment;
  }

  start () {
    const app = express();
    app.get('/', (req, res) => res.send('Hello bis'));

    app.listen(this.port, () => console.log('Started listening'));
  }
}

module.exports = Server
