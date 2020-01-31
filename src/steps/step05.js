const { Elastic } = require('../init');

async function run() {
  const { bulkIndex, bulkData } = require('../bulks/age_gender');
  const { errors, took } = await Elastic.bulkInsert(bulkIndex, bulkData);
  if (!errors) {
    console.log(`ES took ${took}ms`);
  } else {
    console.log(errors);
  }
}

run().catch(console.log);
