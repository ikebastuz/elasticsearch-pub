var Mongo = require('mongodb').MongoClient;

class MongoClient {
  constructor(options) {
    this.options = options;
  }

  async initConnection() {
    const { url, port, db } = this.options;
    return new Promise((resolve, reject) => {
      Mongo.connect(
        `${url}:${port}`,
        { useUnifiedTopology: true },
        (err, client) => {
          if (err) reject();

          this.client = client;
          this.db = client.db(db);
          resolve();
        }
      );
    });
  }

  async countCollectionRecords(collection) {
    const coll = this.db.collection(collection);
    const count = await coll.countDocuments({});
    let stats = {};
    try {
      stats = await coll.stats();
    } catch (e) {}
    return { count, stats };
  }

  async bulkInsertData(collection, data) {
    console.time(`Mongo bulk insert ${data.length} records`);
    await this.db.collection(collection).insertMany(data);
    console.timeEnd(`Mongo bulk insert ${data.length} records`);
  }

  async dropCollection(collection) {
    this.db.collection(collection).drop();
  }

  async aggregateCollection(collection, field) {
    return new Promise((resolve, reject) => {
      console.time(`Mongo aggregation took`);
      this.db
        .collection(collection)
        .aggregate([
          { $match: {} },
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
              min: { $min: `$${field}` },
              max: { $max: `$${field}` },
              avg: { $avg: `$${field}` },
              sum: { $sum: `$${field}` }
            }
          }
        ])
        .toArray((err, docs) => {
          console.timeEnd(`Mongo aggregation took`);
          if (err) reject(err);
          if (docs.length) {
            resolve(docs[0]);
          }
        });
    });
  }
}

module.exports = MongoClient;
