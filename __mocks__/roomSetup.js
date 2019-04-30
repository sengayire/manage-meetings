import * as queryHelper from '../src/components/helpers/QueriesHelpers';

const error = { graphQLErrors: [{ message: 'No resource found' }] };
const user = {
  id: 8,
  location: 'Lagos',
};
const mockedClient = {
  readQuery: jest.fn().mockImplementationOnce(() => user),
  query: jest.fn(),
};

const result = {
  allRooms: {
    rooms: [
      {
        id: '3',
        name: 'Gulu',
        capacity: 1,
        roomLabels: [],
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
        roomLabels: [],
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
        roomLabels: [],
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
        roomLabels: [],
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
        roomLabels: [],
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
};

const mockedGetUserDetails = jest.spyOn(queryHelper, 'getUserDetails').mockImplementationOnce(() => user);

export {
  result,
  error,
  mockedClient,
  mockedGetUserDetails,
};
