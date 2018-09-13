import gql from 'graphql-tag';

const DELETE_ROOM = gql`
   mutation DeleteRoom($roomId: Int!) {
    deleteRoom(roomId: $roomId) {
      room {
        id
        name
        }
      }
    }
`;

export { DELETE_ROOM as default };
