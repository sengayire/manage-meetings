import { GET_ROOMS_QUERY } from '../src/graphql/queries/Rooms';
import allRooms from '../__mocks__/rooms/Rooms';
import * as queryHelper from '../src/components/helpers/QueriesHelpers';

const request = {
  query: GET_ROOMS_QUERY,
  variables: {
    page: 1,
    perPage: 8,
  },
};

const initProps = {
  data: {
    fetchMore: jest.fn(() => Promise.resolve()),
    updateQuery: jest.fn(),
    allRooms: {
      rooms: [],
    },
    variables: {
      page: 1,
      perPage: 8,
      capacity: 0,
      location: '',
      office: '',
    },
  },
  loading: false,
  error: undefined,
};
const result = { ...allRooms };
const error = { graphQLErrors: [{ message: 'No resource found' }] };
const user = {
  id: 8,
  location: 'Lagos',
};
const mockedClient = {
  readQuery: jest.fn().mockImplementationOnce(() => user),
  query: jest.fn(),
};

const mockedGetUserDetails = jest.spyOn(queryHelper, 'getUserDetails').mockImplementationOnce(() => user);

export {
  request,
  initProps,
  result,
  error,
  mockedClient,
  mockedGetUserDetails,
};
