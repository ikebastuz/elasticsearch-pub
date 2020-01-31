const gotDataset = [
  {
    id: 1,
    text: "If I fall, don't bring me back.",
    user: 'jon',
    date: new Date()
  },
  {
    id: 2,
    text: 'Witer is coming',
    user: 'ned',
    date: new Date()
  },
  {
    id: 3,
    text: 'A Lannister always pays his debts.',
    user: 'tyrion',
    date: new Date()
  },
  {
    id: 4,
    text: 'I am the blood of the dragon.',
    user: 'daenerys',
    date: new Date()
  },
  {
    id: 5,
    text: "A girl is Arya Stark of Winterfell. And I'm going home.",
    user: 'arya',
    date: new Date()
  }
];

const gotIndex = {
  index: 'tweets',
  body: {
    mappings: {
      properties: {
        id: { type: 'integer' },
        text: { type: 'text' },
        user: { type: 'keyword' },
        time: { type: 'date' }
      }
    }
  }
};

module.exports = {
  gotDataset,
  gotIndex
};
