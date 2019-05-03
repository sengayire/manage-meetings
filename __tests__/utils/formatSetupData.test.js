import * as formatSetupData from '../../src/utils/formatSetupData';

const setupMock = [
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

const mockChild = [
  {
    level: 3,
    locationId: 1,
    name: 'Corner 3',
    parentId: 'f4f301ee-5a3c-46b8-a59b-39177c3ab9ae',
    parentTitle: 'Pandora',
    position: 3,
    structureId: '388de7e0-4b2e-4d56-9804-c6205a5d20be',
    tag: 'Pandora',
  },
];

describe('Test for formatSetupData', () => {
  it('Should return an array of the formarted data', () => {
    jest.spyOn(formatSetupData, 'formatData').mockImplementationOnce(() => setupMock);
    jest.spyOn(formatSetupData, 'getparentTitle').mockImplementationOnce(() => mockChild);
    const result = formatSetupData.orderByLevel(setupMock);
    expect(result.length).toBe(2);
  });
});
