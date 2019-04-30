export const mockState = {
  showDeleteModal: true,
  nodesToBeDeleted: [],
  deleteLevel: {
    structureId: '2becc066-3cbf-4fcc-a348-9522109b8bcf',
    level: 3,
    name: 'Section 2',
    parentId: '8882d021-81b0-42df-ac76-f475c4b267ea',
    parentTitle: 'First Floor',
  },
  structureList: [
    [
      {
        structureId: '2becc066-3cbf-4fcc-a348-9522109b8bcf',
        level: 3,
        name: 'Section 2',
        parentId: '8882d021-81b0-42df-ac76-f475c4b267ea',
        parentTitle: 'First Floor',
      },
    ],
    [
      {
        structureId: '497d8211-0feb-4625-83e4-3f772d31a823',
        level: 4,
        name: 'Valhalla',
        parentId: '2becc066-3cbf-4fcc-a348-9522109b8bcf',
        parentTitle: 'Section 2',
      },
    ],
  ],
  levelName: 'Section 2',
};


export const mockProps = {
  flattenedStruct: [
    {
      structureId: '99f81e87-5e38-43af-8615-98d814868a19',
      level: 3,
      name: 'Section 1',
      parentId: '8882d021-81b0-42df-ac76-f475c4b267ea',
      parentTitle: 'First Floor',
    },
    {
      structureId: '2becc066-3cbf-4fcc-a348-9522109b8bcf',
      level: 3,
      name: 'Section 2',
      parentId: '8882d021-81b0-42df-ac76-f475c4b267ea',
      parentTitle: 'First Floor',
    },
  ],
  previewBuildingStructure: jest.fn(),
};
