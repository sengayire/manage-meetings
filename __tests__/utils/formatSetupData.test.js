import formatSetupData from '../../src/utils/formatSetupData';

const setupMock = [
  {
    id: 'b05fc5f2-b4aa-4f48-a8fb-30bdcc3fc968',
    level: 1,
    name: 'Epic tower',
    parentId: '',
    tag: 'Building',
    locationId: 1,
    position: 1,
  },
  {
    id: 'b05fc5f2-b4aa-4f48-a8fb-30bdcc3fc961',
    level: 2,
    name: 'Floor 1',
    parentId: 'b05fc5f2-b4aa-4f48-a8fb-30bdcc3fc968',
    tag: 'floors',
    locationId: 1,
    position: 1,
  },
  {
    id: 'b05fc5f2-b4aa-4f48-a8fb-30bdcc3fc962',
    level: 2,
    name: 'Floor 2',
    parentId: 'b05fc5f2-b4aa-4f48-a8fb-30bdcc3fc968',
    tag: 'floors',
    locationId: 1,
    position: 2,
  },
];
describe('Test for formatSetupData', () => {
  it('Should return an array of the formarted data', () => {
    const result = formatSetupData(setupMock);
    expect(result.length).toEqual(2);
    expect(typeof result[0]).toBe('object');
    expect(Array.isArray(result[0].children)).toBe(true);
  });
});
