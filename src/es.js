const R = require('ramda');

class ES {
  constructor(client) {
    this.client = client;
  }

  async listIndices() {
    const { body } = await this.client.cat.indices({
      format: 'json'
    });
    return body.map((index) => ({
      index: index.index,
      count: index['docs.count'],
      size: index['store.size']
    }));
  }

  async deleteIndex(index) {
    try {
      const { body } = await this.client.indices.delete({ index });
      return body;
    } catch (e) {
      return e.meta.body.error.root_cause[0].type;
    }
  }

  async bulkInsert(index, dataset) {
    await this.client.indices.create(index, { ignore: [400] });

    console.time(`Elastic bulk insert ${dataset.length} records`);

    const body = R.compose(
      R.flatten,
      R.map((doc) => [{ index: { _index: index.index } }, doc])
    )(dataset);

    const {
      body: { errors, took }
    } = await this.client.bulk({
      refresh: true,
      body
    });

    console.timeEnd(`Elastic bulk insert ${dataset.length} records`);

    return { errors, took };
  }

  async aggregate(index, query) {
    try {
      console.time(`Elastic aggregation took`);
      const response = await this.client.search({
        size: 0,
        index,
        body: {
          ...query
        }
      });
      console.timeEnd(`Elastic aggregation took`);
      const {
        body: { took, aggregations }
      } = response;

      return { took, aggregations };
    } catch (e) {
      return e;
    }
  }
}

module.exports = ES;
