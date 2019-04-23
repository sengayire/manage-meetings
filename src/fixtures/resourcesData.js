// mock data for rooms assigned to resources.

const resourcesData = {
  resourceName: 'Apple TV',
  numberOfRoom: 3,
  roomNames: ['obudu', 'cognito', 'safari', 'Big apple'],
};
const user = {
  user: {
    id: '214',
    roles: [{ id: '2', role: 'Admin' }],
  },
};
const allResources = [
  {
    id: '93',
    name: '50 inch screen',
    quantity: 1,
    room: { id: '168', name: 'Conakry' },
  },
  {
    id: '1033',
    name: 'Cables',
    quantity: 1,
    room: { id: '164', name: 'Freetown' },
  },
  {
    id: '106',
    name: 'Dustbin',
    quantity: 1,
    roomId: 170,
    room: { id: '235', name: 'Akwaaba' },
  },
];

const remoteRooms = [
  {
    calendarId: 'andela.com_2d3237333239383832343333@resource.calendar.google.com',
    name: 'Nairobi -  Container Kigali(1)',
  },
];

export { resourcesData, allResources, remoteRooms, user };
