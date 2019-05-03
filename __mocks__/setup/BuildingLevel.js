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
        level: 0,
        name: 'Block A',
        parentId: null,
        parentTitle: '',
      },
    ],
    parentId: null,
    parentTitle: '',
    quantity: 2,
    tag: 'Dojo',
  },
];
const mockDataStructure = [
  {
    id: 'c1a63f0e-72dc-4924-9f31-4279a8936efe',
    level: 2,
    children: [
      {
        level: 2,
        locationId: 1,
        name: 'F 2',
        parentId: '0ba3a2af-c8e8-406e-9d6d-034ce73d3cb4',
        parentTitle: '',
        position: 2,
        structureId: '17bbd44d-02a4-460b-9c96-e7c4cf7b66cf',
        tag: 'Block B',
      },
    ],
    parentId: '26c33b43-3d35-4cc2-8d7f-3104d4d7e06b',
    parentTitle: '',
    quantity: 4,
    tag: 'Block C',
  },
];
export { user, allLocations, level, validLevel, invalidLevel, mockDataStructure };
