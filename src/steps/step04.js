const { Elastic, Mongo } = require('../init');

/**
 * Aggregate 1kk of "donation" records
 */
async function run() {
  await Mongo.initConnection();
  const aggs = await Mongo.aggregateCollection('donations', 'amount');
  console.log(aggs);
  Mongo.client.close();

  try {
    const {
      took,
      aggregations: { statistics }
    } = await Elastic.aggregate('donations', {
      aggs: {
        statistics: { stats: { field: 'amount' } }
      }
    });
    console.log(`ES service took: ${took} ms`);
    console.log(statistics);
  } catch (e) {
    console.log(e);
  }
}

run().catch(console.log);
