import apolloClient from '../../../utils/ApolloClient';
import UPDATE_ROOM from '../../../graphql/mutations/rooms/UpdateRoom';
import { GET_ROOMS_QUERY } from '../../../graphql/queries/Rooms';
import { getUserDetails } from '../QueriesHelpers';

const updateRoom = async (currentPage, roomData, client = apolloClient) => {
  try {
    const { location } = await getUserDetails();
    await client.mutate({
      mutation: UPDATE_ROOM,
      name: 'updateRoom',
      variables: {
        ...roomData,
      },
    });
    const allRoomsData = await client.readQuery(
      {
        query: GET_ROOMS_QUERY,
        variables: {
          location,
          office: '',
          page: currentPage,
          perPage: 8,
          roomLabels: '',
        },
      },
      true,
    );
    return allRoomsData;
  } catch (error) {
    return error.message;
  }
};

export default updateRoom;
