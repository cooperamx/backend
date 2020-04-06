const uuid4 = require('uuid').v4;

class CommerceRepository {
  constructor (dataStore) {
    this.dataStore = dataStore;
  }

  create (data) {
    const key = this.dataStore.key(['Commerce', uuid4()]);

    return this.dataStore.save({ key, data });
  }

  get (key) {
    return this.dataStore.get(key);
  }
}

module.exports = CommerceRepository;
