import { GET_USER_QUERY, GET_LOCATION_QUERY, GET_ROLE_QUERY } from '../../graphql/queries/People';
import {
  GET_ALL_ROOMS,
  GET_LOCATIONS_QUERY,
  GET_ROOMS_QUERY,
  GET_ALL_REMOTE_ROOMS,
  GET_REMOTE_ROOMS_ALL_LOCATIONS,
} from '../../graphql/queries/Rooms';
import { GET_RESOURCES_QUERY, GET_ROOM_RESOURCES } from '../../graphql/queries/Resources';
import SINGLE_ROOM_FEEDBACK, { ALL_ROOM_FEEDBACK } from '../../graphql/queries/RoomFeedback';
import ALL_ANALYTICS, { ANALYTICS_FOR_DAILY_ROOM_EVENTS } from '../../graphql/queries/analytics';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import apolloClient from '../../utils/ApolloClient';
import GET_ALL_LEVELS from '../../graphql/queries/Levels';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../graphql/queries/questions';
import { GET_DEVICES_QUERY } from '../../graphql/queries/Devices';

const getUserLocation = (client = apolloClient) => client.readQuery({
  query: GET_LOCATION_QUERY,
}).userLocation;

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


const getAllLocationsFromCache = (client = apolloClient) => {
  const data = client.readQuery(
    {
      query: GET_LOCATIONS_QUERY,
    },
    true,
  );
  return data.allLocations;
};

const getRoomListVariables = (userLocation, perPage, page, textVariable) => ({
  location: getUserLocation().name,
  office: '',
  page,
  perPage,
  roomLabels: textVariable,
});

const getRoomList = async (userLocation, perPage, page, textVariable, client = apolloClient) => {
  // making 'textVariable' NULL disables filtering by tags
  const nullTextVariable = '';
  try {
    const data = await client.readQuery({
      query: GET_ROOMS_QUERY,
      variables: getRoomListVariables(userLocation, perPage, page, nullTextVariable),
    });
    return data;
  } catch (error) {
    const { data } = await client.query({
      query: GET_ROOMS_QUERY,
      fetchPolicy: 'network-only',
      variables: getRoomListVariables(userLocation, perPage, page, nullTextVariable),
    });
    return data;
  }
};

const getAllResources = async (perPage, page, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_RESOURCES_QUERY,
        variables: {
          page: page || 1,
          perPage: perPage || 5,
        },
      },
      true,
    );
    return data.allResources;
  } catch (error) {
    const { data } = await client.query({
      query: GET_RESOURCES_QUERY,
      variables: {
        page: page || 1,
        perPage: perPage || 5,
      },
    });
    return data.allResources;
  }
};

const getRoomResources = async (roomId, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_ROOM_RESOURCES,
        variables: {
          roomId,
        },
      },
      true,
    );
    return data.getResourcesByRoomId.roomResources;
  } catch (error) {
    const { data } = await client.query({
      query: GET_ROOM_RESOURCES,
      variables: {
        roomId,
      },
    });
    return data.getResourcesByRoomId.roomResources;
  }
};

const getSingleRoomFeedback = async (roomId, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: SINGLE_ROOM_FEEDBACK,
        variables: {
          roomId,
        },
      },
      true,
    );
    return data.roomResponse;
  } catch (error) {
    const { data } = await client.query({
      query: SINGLE_ROOM_FEEDBACK,
      variables: {
        roomId,
      },
    });
    return data.roomResponse;
  }
};

const getAllRemoteRooms = async (client = apolloClient) => {
  const { data } = await client.query(
    {
      query: GET_ALL_REMOTE_ROOMS,
    },
    true,
  );
  return data.allRemoteRooms;
};

const getRemoteRoomsAllLocations = async (client = apolloClient) => {
  const { data } = await client.query(
    {
      query: GET_REMOTE_ROOMS_ALL_LOCATIONS,
      variables: {
        returnAll: true,
      },
    },
    true,
  );
  return data.allRemoteRooms;
};

const getRoomsStructure = async (client = apolloClient) => {
  try {
    const data = client.readQuery({
      query: GET_ALL_LEVELS,
    }, true);
    return data;
  } catch (error) {
    const { data } = await client.query({
      query: GET_ALL_LEVELS,
    }, true);
    return data;
  }
};

const getRoomFeedbackQuestions = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
      },
      true,
    );
    return data.questions;
  } catch (err) {
    const { data } = await client.query({
      query: GET_ROOM_FEEDBACK_QUESTIONS_QUERY,
    });
    return data.questions;
  }
};

const getAllRooms = async (location, client = apolloClient) => {
  try {
    const data = client.readQuery({
      query: GET_ALL_ROOMS,
      variables: {
        location,
      },
    }, true);
    return data;
  } catch (error) {
    const { data } = await client.query({
      query: GET_ALL_ROOMS,
      variables: {
        location,
      },
    }, true);
    return data;
  }
};

const getAllAnalytics = async (dateValue, client = apolloClient) => {
  const variables = {
    ...dateValue,
    locationId: Number(getUserLocation().id),
  };
  try {
    const data = client.readQuery(
      {
        query: ALL_ANALYTICS,
        variables,
      },
      true,
    );
    return data;
  } catch (err) {
    const { data } = await client.query({
      query: ALL_ANALYTICS,
      variables,
    });
    return data;
  }
};

const query = (perPage, page, dateValue) => {
  const { startDate, endDate } = dateValue;
  return ({
    query: ANALYTICS_FOR_DAILY_ROOM_EVENTS,
    variables: {
      startDate,
      endDate,
      page: page || 1,
      perPage: perPage || 5,
    },
  });
};

const getAnalyticForDailyRoomsEvents = async (dateValue, perPage, page, client = apolloClient) => {
  try {
    const data = client.readQuery(
      query(perPage, page, dateValue),
      true,
    );
    return data;
  } catch (err) {
    try {
      const res = await client.query(
        query(perPage, page, dateValue),
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
};

const getAllDevices = async (client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: GET_DEVICES_QUERY,
      },
      true,
    );
    return data.allDevices;
  } catch (error) {
    const { data } = await client.query({
      query: GET_DEVICES_QUERY,
    });
    return data.allDevices;
  }
};

export const getAllResponses = async ({ startDate, endDate } = {}, client = apolloClient) => {
  try {
    const data = client.readQuery(
      {
        query: ALL_ROOM_FEEDBACK,
        variables: {
          startDate: startDate || '',
          endDate: endDate || '',
        },
      },
      true,
    );
    return data.allRoomResponses;
  } catch (error) {
    const { data } = await client.query({
      query: ALL_ROOM_FEEDBACK,
      variables: {
        startDate: startDate || '',
        endDate: endDate || '',
      },
    });
    return data.allRoomResponses;
  }
};

const getUserRole = (client = apolloClient) => client.readQuery({
  query: GET_ROLE_QUERY,
}).userRole;

export {
  getRoomResources,
  getAnalyticForDailyRoomsEvents,
  getAllAnalytics,
  getAllRooms,
  getUserDetails,
  getAllLocations,
  getAllResources,
  getAllRemoteRooms,
  getRoomList,
  getRoomsStructure,
  getRoomFeedbackQuestions,
  getRemoteRoomsAllLocations,
  getAllDevices,
  getSingleRoomFeedback,
  getUserLocation,
  getUserRole,
  getAllLocationsFromCache,
};
