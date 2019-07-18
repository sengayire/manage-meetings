import gql from 'graphql-tag';

const RESOLVE_ROOM_RESPONSE = gql`
mutation resolveRoomResponse($responseId: Int!) {
  resolveRoomResponse(responseId: $responseId) {
    roomResponse {
      resolved
    }
  }
}`;

export default RESOLVE_ROOM_RESPONSE;
