const data = {
  refetch: jest.fn(),
  office: {
    id: '11',
    name: 'EPIC Tower',
    timezone: 'GMT +1',
    location: {
      timeZone: 'EAST_AFRICA',
    },
  },
  officeII: {
    id: '11',
    name: 'EPIC Tower',
    timezone: 'GMT +1',
    location: {
      timeZone: 'WEST_AFRICA',
    },
  },
  resource: {
    name: 'Marker',
    rooms: 4,
  },
  routes: {
    home: '/',
  },
};
module.exports = data;
