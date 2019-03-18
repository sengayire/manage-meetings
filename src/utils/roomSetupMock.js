const selectMockData = [
  {
    name: 'Building',
    id: 'setupBuilding',
    value: 'Buildings',
    placeholder: 'Building 1',
    options: ['building'],
  },
  {
    name: 'all Floors',
    id: 'floors',
    value: 'All floors',
    placeholder: 'All Floors',
    options: ['All Floors'],
  },
  {
    name: 'all wings',
    id: 'wings',
    value: 'All wings',
    placeholder: 'All wings',
    options: ['All wings'],
  },
];

// Mock data for rooms
const roomsMockData = [
  {
    roomName: 'Obudu',
    wingName: 'Safari',
    floorName: '1st floor',
    numberOfSeats: 6,
    numberOfResources: 27,
  },
  {
    roomName: 'Empire State',
    wingName: 'Big Apple',
    floorName: '4th floor',
    numberOfSeats: 12,
    numberOfResources: 27,
  },
  {
    roomName: 'Ike-ogosi',
    wingName: 'Kampala',
    floorName: '3rd floor',
    numberOfSeats: 6,
    numberOfResources: 27,
  },
];

export { selectMockData, roomsMockData };
