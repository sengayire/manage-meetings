import { GET_USER_QUERY } from '../../graphql/queries/People';
import {
  GET_LOCATIONS_QUERY,
  GET_ROOMS_QUERY,
  GET_ALL_REMOTE_ROOMS,
} from '../../graphql/queries/Rooms';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';
import {
  LEAST_BOOKED_ROOMS_ANALYTICS,
  ANALYTICS_BOOKINGS_COUNT,
  MOST_BOOKED_ROOMS_ANALYTICS,
} from '../../graphql/queries/analytics';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import apolloClient from '../../utils/ApolloClient';
import GET_ALL_LEVELS from '../../graphql/queries/Levels';

const getUserDetails = async (client = apolloClient) => {
  const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
  const email = process.env.NODE_ENV === 'test' ? 'converge@andela.com' : userData.email;
  try {
    const data = client.readQuery(
      {
        query: GET_USER_QUERY,
        variables: {
          email,
        },
      },
      true,
    );
    const user = Object.assign({}, data.user);
    user.firstName = userData.firstName;
    return user;
  } catch (err) {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { email },
    });
    const user = Object.assign({}, data.user);
    user.firstName = userData.firstName;
    return user;
  }
};

const getAllLocations = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_LOCATIONS_QUERY,
      },
      true,
    );
    return data.allLocations;
  } catch (err) {
    const { data } = await client.query({
      query: GET_LOCATIONS_QUERY,
    });
    return data.allLocations;
  }
};

const getRoomList = async (userLocation, perPage, page, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_ROOMS_QUERY,
        variables: {
          location: userLocation,
          office: '',
          page,
          perPage,
        },
      },
      true,
    );
    return data;
  } catch (error) {
    const { data } = await client.query({
      query: GET_ROOMS_QUERY,
      variables: {
        location: userLocation,
        office: '',
        page,
        perPage,
      },
    });
    return data;
  }
};

const getAllResources = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_RESOURCES_QUERY,
        variables: {
          page: 1,
          perPage: 5,
        },
      },
      true,
    );
    return data.allResources;
  } catch (err) {
    const { data } = await client.query({
      query: GET_RESOURCES_QUERY,
      variables: {
        page: 1,
        perPage: 5,
      },
    });
    return data.allResources;
  }
};

const getAllRemoteRooms = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_ALL_REMOTE_ROOMS,
      },
      true,
    );
    return data.allRemoteRooms;
  } catch (err) {
    const { data } = await client.query({
      query: GET_ALL_REMOTE_ROOMS,
    });
    return data.allRemoteRooms;
  }
};
const getLeastBookedRooms = async (dateValue, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: LEAST_BOOKED_ROOMS_ANALYTICS,
        variables: dateValue,
      },
      true,
    );
    return data;
  } catch (err) {
    const { data } = await client.query({
      query: LEAST_BOOKED_ROOMS_ANALYTICS,
      variables: dateValue,
    });
    return data;
  }
};

const getMostBookedRooms = async (dateValue, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: MOST_BOOKED_ROOMS_ANALYTICS,
        variables: dateValue,
      },
      true,
    );
    return data;
  } catch (err) {
    const { data } = await client.query({
      query: MOST_BOOKED_ROOMS_ANALYTICS,
      variables: dateValue,
    });
    return data;
  }
};

const getBookingsCount = async (dateValue, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: ANALYTICS_BOOKINGS_COUNT,
        variables: dateValue,
      },
      true,
    );
    return data;
  } catch (err) {
    const { data } = await client.query({
      query: ANALYTICS_BOOKINGS_COUNT,
      variables: dateValue,
    });
    return data;
  }
};
const getRoomsStructure = async (client = apolloClient) => {
  const { data } = await client.query(
    {
      query: GET_ALL_LEVELS,
    },
    true,
  );
  return data;
};

export {
  getUserDetails,
  getAllLocations,
  getAllResources,
  getAllRemoteRooms,
  getRoomList,
  getLeastBookedRooms,
  getMostBookedRooms,
  getBookingsCount,
  getRoomsStructure,
};

