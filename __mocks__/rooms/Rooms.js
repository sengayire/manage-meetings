const allRoomsReturnData = {
  data: {
    allRooms: {
      __typename: 'Rooms',
      rooms: [

        {
          id: '3',
          name: 'Gulu',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '4',
          name: 'Entebbe',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '5',
          name: 'Mbarara',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '6',
          name: 'Mbale',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '8',
          name: 'Ocul',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '9',
          name: 'kampale',
          floor: {
            block: {
              offices: {
                name: 'EPIC Center',
                location: {
                  name: 'Kampala',
                  id: 1,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '10',
          name: 'Charley',
          floor: {
            block: {
              offices: {
                name: 'EPIC TOWER',
                location: {
                  name: 'Lagos',
                  id: 2,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '11',
          name: 'Akwaaba',
          floor: {
            block: {
              offices: {
                name: 'EPIC TOWER',
                location: {
                  name: 'Lagos',
                  id: 2,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '12',
          name: 'Charley',
          floor: {
            block: {
              offices: {
                name: 'EPIC TOWER',
                location: {
                  name: 'Lagos',
                  id: 2,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '13',
          name: 'Ojuelegba',
          floor: {
            block: {
              offices: {
                name: 'EPIC TOWER',
                location: {
                  name: 'Lagos',
                  id: 2,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
        {
          id: '14',
          name: 'Empire State',
          floor: {
            block: {
              offices: {
                name: 'EPIC TOWER',
                location: {
                  name: 'Lagos',
                  id: 2,
                  __typename: 'Location',
                },
                __typename: 'Office',
              },
              __typename: 'Block',
            },
            __typename: 'Floor',
          },
          __typename: 'Room',
        },
      ],
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

export { allRoomsReturnData as default, roomLocations };

