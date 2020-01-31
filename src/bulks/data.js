const R = require('ramda');
const amount = 1000000;

const bulkIndex = {
  index: 'donations',
  body: {
    mappings: {
      dynamic: false,
      properties: {
        amount: { type: 'integer' },
        name: {
          type: 'object',
          enabled: false
        }
      }
    }
  }
};

const normDistrib = (min, max, skew) => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  return R.compose(
    Math.floor,
    (num) => num + min,
    (num) => num * (max - min),
    (num) => Math.pow(num, skew),
    (num) => (num > 1 || num < 0 ? normDistrib(min, max, skew) : num),
    (num) => num / 10.0 + 0.5
  )(Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v));
};

const bulkData = Array.from({ length: amount }, (_, id) => ({
  id,
  amount: normDistrib(0, 100, 1), //Math.floor(Math.random() * 100),
  name: 'amount'
}));

module.exports = {
  bulkData,
  bulkIndex
};
