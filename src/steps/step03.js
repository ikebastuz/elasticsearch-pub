const { Elastic, Mongo } = require('../init');

/**
 * Insert 1kk of "donation" records
 */
async function run() {
  const { bulkIndex, bulkData } = require('../bulks/data');
  const { errors, took } = await Elastic.bulkInsert(bulkIndex, bulkData);
  if (!errors) {
    console.log(`ES took ${took}ms`);
  } else {
    console.log(errors);
  }

  await Mongo.initConnection();
  await Mongo.bulkInsertData('donations', bulkData);
  Mongo.client.close();
}

run().catch(console.log);
