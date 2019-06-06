import { GET_USER_QUERY } from '../../graphql/queries/People';
import {
  GET_ALL_ROOMS,
  GET_LOCATIONS_QUERY,
  GET_ROOMS_QUERY,
  GET_ALL_REMOTE_ROOMS,
  GET_REMOTE_ROOMS_ALL_LOCATIONS,
} from '../../graphql/queries/Rooms';
import { GET_RESOURCES_QUERY } from '../../graphql/queries/Resources';
import ALL_ANALYTICS, { ANALYTICS_FOR_DAILY_ROOM_EVENTS } from '../../graphql/queries/analytics';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';
import apolloClient from '../../utils/ApolloClient';
import GET_ALL_LEVELS from '../../graphql/queries/Levels';
import GET_ROOM_FEEDBACK_QUESTIONS_QUERY from '../../graphql/queries/questions';
import { GET_DEVICES_QUERY } from '../../graphql/queries/Devices';

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
  const { data } = await client.query(
    {
      query: GET_ALL_LEVELS,
    },
    true,
  );
  return data;
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
  try {
    const data = client.readQuery(
      {
        query: ALL_ANALYTICS,
        variables: dateValue,
      },
      true,
    );
    return data;
  } catch (err) {
    const { data } = await client.query({
      query: ALL_ANALYTICS,
      variables: dateValue,
    });
    return data;
  }
};

const query = (dateValue) => {
  const { startDate, endDate } = dateValue;
  return ({
    query: ANALYTICS_FOR_DAILY_ROOM_EVENTS,
    variables: {
      startDate,
      endDate,
    },
  });
};

const getAnalyticForDailyRoomsEvents
 = async (dateValue, client = apolloClient) => {
   try {
     const data = client.readQuery(
       query(dateValue),
       true,
     );
     return data;
   } catch (err) {
     const { data } = await client.query(
       query(dateValue),
     );
     return data;
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

export {
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
};
