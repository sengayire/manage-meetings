import apolloClient from '../../../utils/ApolloClient';
import { ADD_ROOM } from '../../../graphql/mutations/Rooms';
import { GET_ROOMS_QUERY } from '../../../graphql/queries/Rooms';

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
        },
      });
      data.allRooms.rooms.pop();
      data.allRooms.rooms.unshift(createRoom.room);
      updatedData = data;
    },
  });
  return updatedData;
};

export default addRoom;
