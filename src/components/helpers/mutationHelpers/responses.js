import apolloClient from '../../../utils/ApolloClient';
import RESOLVE_ROOM_RESPONSE from '../../../graphql/mutations/Responses';
import SINGLE_ROOM_FEEDBACK from '../../../graphql/queries/RoomFeedback';

const resolveResponses = (responseId, roomId, client = apolloClient) => client
  .mutate({
    mutation: RESOLVE_ROOM_RESPONSE,
    name: 'resolveResponse',
    variables: {
      responseId,
    },
    // write and read from cache
    update: (proxy, resolveResponse) => {
      const cachedResponse = proxy.readQuery({
        query: SINGLE_ROOM_FEEDBACK,
        variables: {
          roomId,
        },
      });

      const { roomResponse } = cachedResponse;
      cachedResponse.roomResponse.response = roomResponse.response.map((response) => {
        if (response.id === responseId) {
          return {
            ...response,
            resolved: resolveResponse.data.resolveRoomResponse.roomResponse.resolved,
          };
        }
        return response;
      });

      proxy.writeQuery({
        query: SINGLE_ROOM_FEEDBACK,
        variables: {
          roomId,
        },
        data: cachedResponse,
      });
    },
  });

export default resolveResponses;
