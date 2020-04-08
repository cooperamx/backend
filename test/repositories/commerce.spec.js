const sinon = require('sinon');

const CommerceRepository = require('../../src/repositories/commerce');

class FakeDataStore {
  constructor() {
    this.key = sinon.spy();
    this.save = sinon.spy();
    this.get = sinon.spy();
  }
}

describe('CommerceRepository', () => {
  const FAKE_COMMERCE = {
    name: 'El Terrible Huichops',
    description: 'Best coffee in town',
    address: 'Iddar St',
    slug: 'el-terrible'
  };

  let dataStore;

  beforeEach(() => {
    dataStore = new FakeDataStore();
  })

  it('should create a commerce', async () => {
    const repository = new CommerceRepository(dataStore);

    await repository.create(FAKE_COMMERCE);

    expect(dataStore.key).to.be.called;
    expect(dataStore.save).to.be.called;
  });

  it('should get a commerce', async () => {
    const repository = new CommerceRepository(dataStore);

    await repository.get('commerce-key');

    expect(dataStore.get).to.be.called;
  })
})
