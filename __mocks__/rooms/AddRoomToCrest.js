const addRoomToCrest = {
  data: {
    createRoom: {
      room: {
        id: '1',
        name: 'Room 1',
        roomType: 1,
        capacity: 10,
        imageUrl: 'path/to/image.jpg',
      },
    },
  },
};
const variables = {
  roomType: 'meeting',
  roomName: 'Room 1',
  roomFloorId: 1,
  roomCapacity: 10,
  roomCalendar: 'andela.com1',
  roomImageUrl: 'path/to/image.jpg',
  office_id: 1,
};

export { addRoomToCrest as default, variables };
