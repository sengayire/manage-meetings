import formatFloorData from '../../../../src/graphql/mappers/Floors';
import floor from '../../../../__mocks__/floors/Floors';

describe('formatFloorData', () => {
  it('should successfully format floor data', () => {
    const { office } = formatFloorData(floor);
    expect(office).toEqual('Epic');
  });
});
