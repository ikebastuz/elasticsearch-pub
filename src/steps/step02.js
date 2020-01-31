const { Elastic, Mongo } = require('../init');

/**
 * Delete "donation" records
 */
async function run() {
  await Mongo.initConnection();
  Mongo.dropCollection('donations');
  Mongo.client.close();
  const response = await Elastic.deleteIndex('donations');
  console.log(response);
}

run().catch(console.log);
