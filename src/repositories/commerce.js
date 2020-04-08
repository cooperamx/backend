const uuid4 = require('uuid').v4;

class CommerceRepository {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  async create(data) {
    const id = uuid4();
    const key = this.dataStore.key(['Commerce', id]);

    await this.dataStore.save({ key, data });

    return id;
  }

  get(id) {
    const key = this.dataStore.key(['Commerce', id]);
    return this.dataStore.get(key);
  }
}

module.exports = CommerceRepository;
