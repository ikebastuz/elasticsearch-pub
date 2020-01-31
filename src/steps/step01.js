const { Elastic, Mongo } = require('../init');

/**
 * Count "donation" records
 */
async function run() {
  await Mongo.initConnection();
  const { count, stats } = await Mongo.countCollectionRecords('donations');
  console.log(
    `Mongo "donation" collection records: ${count}. Storage size: ${stats.storageSize}`
  );
  Mongo.client.close();

  const indices = await Elastic.listIndices();
  console.log('Elastic indices: ');
  console.log(indices);
}

run().catch(console.log);
