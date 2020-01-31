const uuid = () =>
  Math.random()
    .toString(36)
    .substring(2, 15);

const bulkIndex = {
  index: 'population',
  body: {
    mappings: {
      dynamic: false,
      properties: {
        age: { type: 'integer' },
        gender: { type: 'keyword' },
        timestamp: { type: 'date' }
      }
    }
  }
};

const bulkData = [
  {
    id: uuid(),
    age: 5,
    gender: 'female',
    timestamp: '2019-09-12T05:00:00+00:00'
  },
  {
    id: uuid(),
    age: 15,
    gender: 'female',
    timestamp: '2019-09-13T05:15:00+00:00'
  },
  {
    id: uuid(),
    age: 18,
    gender: 'male',
    timestamp: '2019-09-13T05:12:00+00:00'
  },
  {
    id: uuid(),
    age: 16,
    gender: 'female',
    timestamp: '2019-09-13T05:18:00+00:00'
  },
  {
    id: uuid(),
    age: 25,
    gender: 'male',
    timestamp: '2019-09-14T05:25:00+00:00'
  },
  {
    id: uuid(),
    age: 35,
    gender: 'male',
    timestamp: '2019-09-12T06:25:00+00:00'
  },
  {
    id: uuid(),
    age: 37,
    gender: 'female',
    timestamp: '2019-09-13T06:25:00+00:00'
  },
  {
    id: uuid(),
    age: 46,
    gender: 'female',
    timestamp: '2019-09-14T08:45:00+00:00'
  },
  {
    id: uuid(),
    age: 42,
    gender: 'female',
    timestamp: '2019-09-14T09:45:00+00:00'
  },
  {
    id: uuid(),
    age: 39,
    gender: 'male',
    timestamp: '2019-09-14T09:15:00+00:00'
  },
  {
    id: uuid(),
    age: 15,
    gender: 'male',
    timestamp: '2019-09-12T12:45:00+00:00'
  },
  {
    id: uuid(),
    age: 14,
    gender: 'male',
    timestamp: '2019-09-12T12:35:00+00:00'
  },
  {
    id: uuid(),
    age: 60,
    gender: 'female',
    timestamp: '2019-09-13T17:45:00+00:00'
  },
  {
    id: uuid(),
    age: 7,
    gender: 'male',
    timestamp: '2019-09-14T17:45:00+00:00'
  },
  {
    id: uuid(),
    age: 9,
    gender: 'male',
    timestamp: '2019-09-14T17:48:00+00:00'
  },
  {
    id: uuid(),
    age: 12,
    gender: 'female',
    timestamp: '2019-09-14T16:48:00+00:00'
  },
  {
    id: uuid(),
    age: 17,
    gender: 'female',
    timestamp: '2019-09-12T15:22:00+00:00'
  }
];

module.exports = {
  bulkData,
  bulkIndex
};
