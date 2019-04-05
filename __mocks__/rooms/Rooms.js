const allRoomsReturnData = {
  data: {
    allRooms: {
      rooms: [
        {
          id: '3',
          name: 'Gulu',
          capacity: 1,
          floor: {
            name: 'Third floor',
            block: {
              name: 'EPIC Center',
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Offices',
              },
              __typename: 'SingleBlock',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '4',
          name: 'Entebbe',
          capacity: 1,
          floor: {
            name: 'First floor',
            block: {
              name: 'EPIC Center',
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Offices',
              },
              __typename: 'SingleBlock',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '5',
          name: 'Mbarara',
          capacity: 1,
          floor: {
            name: 'Third floor',
            block: {
              name: 'EPIC Center',
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Offices',
              },
              __typename: 'SingleBlock',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '6',
          name: 'Mbale',
          capacity: 1,
          floor: {
            name: 'Second floor',
            block: {
              name: 'EPIC Center',
              offices: null,
              __typename: 'SingleBlock',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '8',
          name: 'Ocul',
          capacity: 1,
          floor: {
            name: 'Third floor',
            block: {
              name: 'EPIC Center',
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Offices',
              },
              __typename: 'SingleBlock',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
      ],
      pages: 2,
      queryTotal: 11,
      hasNext: true,
      hasPrevious: false,
      __typename: 'Rooms',
    },
  },
};

const roomLocations = [
  {
    id: '1',
    name: 'Kampala',
    __typename: 'Location',
  },
  {
    id: '2',
    name: 'Lagos',
    __typename: 'Location',
  },
  {
    id: '3',
    name: 'Nairobi',
    __typename: 'Location',
  },
];

const formDetails = {
  roomId: '1',
  name: 'HighLan',
};

const locationData = {
  data: {
    allLocations: [
      {
        id: '2',
        name: 'Kampala',
      },
      {
        id: '3',
        name: 'Nairobi',
      },
      {
        id: '1',
        name: 'Lagos',
      },
    ],
  },
};

const getRoomByNameData = {
  data: {
    getRoomByName: [
      {
        roomType: 'meeting room',
        id: '150',
        name: 'Kampala',
        capacity: 14,
        floor: {
          block: {
            offices: {
              name: 'The Dojo 2',
              location: {
                name: 'Nairobi',
                id: '3',
              },
            },
          },
        },
      },
    ],
  },
};

// const formDetails = [
//   {
//     id: '1',
//     roomName: 'HighLan',
//     __typename: 'Room',
//   },
//   {
//     id: '2',
//     roomName: 'Lagos',
//     __typename: 'Room',
//   },
//   {
//     id: '3',
//     roomName: 'Nairobi',
//     __typename: 'Room',
//   },
// ];


export
{
  allRoomsReturnData as default,
  roomLocations,
  formDetails,
  locationData,
  getRoomByNameData,
};

