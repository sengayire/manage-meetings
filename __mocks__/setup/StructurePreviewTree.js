const mockData = [
  {
    id: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
    level: 1,
    children: [
      {
        structureId: '4ff98669-5ba0-4f2b-a858-a51df4109879',
        level: 1,
        name: 'Block A',
        parentId: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
        parentTitle: '',
      },
      {
        structureId: 'afcf2ecc-4a6b-4f5a-8579-ea904ae584cf',
        level: 1,
        name: 'Block B',
        parentId: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
        parentTitle: '',
      },
    ],
    parentId: null,
    parentTitle: '',
    quantity: 2,
    tag: 'Dojo',
  },
  {
    id: 'c1a63f0e-72dc-4924-9f31-4279a8936dfd',
    level: 2,
    children: [
      {
        structureId: '4ff98669-5ba0-4f2b-a858-a51df4109879',
        level: 2,
        name: 'Block A',
        parentId: '',
        parentTitle: '',
      },
      {
        structureId: 'afcf2ecc-4a6b-4f5a-8579-ea904ae584cf',
        level: 2,
        name: 'Block B',
        parentId: '',
        parentTitle: '',
      },
    ],
    parentId: null,
    parentTitle: '',
    quantity: 2,
    tag: 'Dojo',
  },
];

const sampleData = [
  {
    id: '4ff98669-5ba0-4f2b-a858-a51df4109879',
    name: 'Block A',
    parentId: '',
    children: [
      {
        structureId: '4ff98669-5ba0-4f2b-a858-a51df4109874',
        name: 'Block A',
        parentId: '4ff98669-5ba0-4f2b-a858-a51df4109879',
      },
    ],
  },
  {
    id: 'afcf2ecc-4a6b-4f5a-8579-ea904ae584cf',
    name: 'Block B',
    parentId: '4ff98669-5ba0-4f2b-a858-a51df4109879',
    children: [
      {
        id: 'afcf2ecc-4a6b-4f5a-8579-ea904ae584ct',
        name: 'Block B',
        parentId: 'afcf2ecc-4a6b-4f5a-8579-ea904ae584cf',
      },
    ],
  },
];

const event = {
  preventDefault: () => {},
  target: {
    value: 'DELETE',
  },
};

export {
  mockData as default,
  sampleData,
  event,
};
