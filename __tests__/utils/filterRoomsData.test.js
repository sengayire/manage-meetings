import filterRooms from '../../src/utils/filterRoomsData';

describe('filterRoomsData Method', () => {
  it('should not filter the array if there is no filter string', () => {
    const list = [];
    const filterString = null;
    expect(filterRooms(list, filterString)).toEqual(list);
  });

  it('should successfully filter by name', () => {
    const list = {
      rooms: [
        { name: 'joel', roomLabels: [] },
        { name: 'patrick', roomLabels: [] },
      ],
    };
    const filterString = 'joel';
    expect(filterRooms(list, filterString)).toEqual({
      rooms: [
        { name: 'joel', roomLabels: [] },
      ],
    });
  });

  it('should successfully filter by label', () => {
    const list = {
      rooms: [
        { name: 'joel', roomLabels: [] },
        { name: 'patrick', roomLabels: ['goodroom'] },
      ],
    };
    const filterString = 'goodroom';
    expect(filterRooms(list, filterString)).toEqual({
      rooms: [
        { name: 'patrick', roomLabels: ['goodroom'] },
      ],
    });
  });
});
