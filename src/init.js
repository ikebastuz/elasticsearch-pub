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

module.exports = {
  Elastic,
  Mongo
};
