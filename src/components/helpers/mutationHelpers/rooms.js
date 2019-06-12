import apolloClient from '../../../utils/ApolloClient';
import { ADD_ROOM, DELETE_ROOM } from '../../../graphql/mutations/Rooms';
import { GET_ROOMS_QUERY } from '../../../graphql/queries/Rooms';
import { getUserDetails } from '../../helpers/QueriesHelpers';

const addRoom = async (variables, location, client = apolloClient) => {
  let updatedData;
  const {
    imageUrl, name, capacity, roomType, calendarId, roomLabels, locationId, structureId,
  } = variables;
  await client.mutate({
    mutation: ADD_ROOM,
    name: 'addRoom',
    variables: {
      imageUrl, name, capacity, roomType, calendarId, roomLabels, locationId, structureId,
    },
    refetchQueries: [
      {
        query: GET_ROOMS_QUERY,
        variables: {
          location,
          office: '',
          page: 1,
          perPage: 8,
          roomLabels: '',
        },
      },
    ],
    update: async (store, { data: { createRoom } }) => {
      const data = await store.readQuery({
        query: GET_ROOMS_QUERY,
        variables: {
          location,
          office: '',
          page: 1,
          perPage: 8,
          roomLabels: '',
        },
      });
      data.allRooms.rooms.unshift(createRoom.room);
      updatedData = data;
    },
  });
  return updatedData;
};

const getRoomsQueryObj = (location, theData = undefined) => (
  {
    query: GET_ROOMS_QUERY,
    variables: {
      location,
      office: '',
      page: 1,
      perPage: 8,
      roomLabels: '',
    },
    data: theData,
  }
);

const deleteRoom = async (roomId, client = apolloClient) => {
  const user = await getUserDetails();
  const roomsQueryObject = getRoomsQueryObj(user.location);
  let data;
  await client.mutate({
    mutation: DELETE_ROOM,
    name: 'deleteRoom',
    variables: {
      roomId,
    },
    refetchQueries: [roomsQueryObject],
    update: async (cache, { data: roomDelete }) => {
      data = cache.readQuery(roomsQueryObject);
      data.allRooms.rooms = data.allRooms.rooms.filter(
        room => room.id !== roomDelete.deleteRoom.room.id,
      );
      cache.writeQuery(getRoomsQueryObj(user.location, data));
    },
  });
  return data;
};

export {
  deleteRoom,
  addRoom,
};
