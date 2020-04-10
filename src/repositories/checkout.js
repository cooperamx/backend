const uuid4 = require('uuid').v4;

class CheckoutRepository {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  async create(data) {
    const id = uuid4();
    const key = this.dataStore.key(['CouponCheckout', id]);

    await this.dataStore.save({ key, data });

    return id;
  }
}

module.exports = CheckoutRepository;
