'use strict';
const { Client } = require('@elastic/elasticsearch');
const esClient = new Client({ node: 'http://localhost:9200' });
const ES = require('./es');
const MongoClient = require('./mongo');
const Elastic = new ES(esClient);

const Mongo = new MongoClient({
  url: 'mongodb://localhost',
  db: 'test',
  port: 27017
});

async function run() {
  /* Mongo count collection 
  await Mongo.initConnection();
  const count = await Mongo.countCollectionRecords('donations');
  console.log(count);
  Mongo.client.close();
  */
  /* List indices 
  const indices = await Elastic.listIndices();
  console.log('Indices: ');
  console.log(indices);
  */
  /* Elastic + Mongo Bulk insert 
  const { bulkIndex, bulkData } = require('./bulks/data');
  
  const response = await Elastic.bulkInsert(bulkIndex, bulkData);
  console.log(response);

  await Mongo.initConnection();
  await Mongo.bulkInsertData('donations', bulkData);
  Mongo.client.close();
  */
  /* Delete index 
  const response = await Elastic.deleteIndex('donations');
  console.log(response);
  */
  /* Aggregate statistics (amount) 
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
  */
  /* Mongo aggregate collection 
  await Mongo.initConnection();
  const aggs = await Mongo.aggregateCollection('donations', 'amount');
  console.log(aggs);
  Mongo.client.close();
  */
}

run().catch(console.log);
