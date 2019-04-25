const user = {
  user: {
    id: '214',
    roles: [{ id: 2, role: 'Admin' }],
  },
};
const allLocations = [
  { id: '229', name: 'Cairo' },
  { id: '2', name: 'Kampala' },
  { id: '1', name: 'Lagos' },
  { id: '3', name: 'Nairobi' },
];

const level = {
  id: '41463aab-243d-470d-9040-73b583ba9a10',
  level: 1,
  name: 'UTG',
  parentId: '',
  parentTitle: '',
};

const validLevel = [
  {
    id: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
    level: 2,
    children: [
      {
        id: '4ff98669-5ba0-4f2b-a858-a51df4109879',
        level: 1,
        name: 'Block A',
        parentId: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
        parentTitle: '',
      },
    ],
    parentId: null,
    parentTitle: '',
    quantity: 2,
    tag: 'Dojo',
  },
];

const invalidLevel = [
  {
    id: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
    level: 2,
    children: [
      {
        id: '4ff98669-5ba0-4f2b-a858-a51df4109879',
        level: 1,
        name: 'Block A',
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
export { user, allLocations, level, validLevel, invalidLevel };
