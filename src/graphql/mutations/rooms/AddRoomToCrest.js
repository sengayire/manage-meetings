import gql from 'graphql-tag';

export const ADD_ROOM_TO_CREST = gql`
mutation CreateRoom($roomType: String!, $roomName: String!, $roomFloorId: Int!, $roomCapacity: Int!, $roomCalendar: String!, $office_id: Int!, $roomImageUrl: String) {
  createRoom(roomType: $roomType, name: $roomName, floorId: $roomFloorId, capacity: $roomCapacity, calendarId: $roomCalendar, imageUrl: $roomImageUrl, officeId: $office_id) {
    room {
      id
      name
      roomType
      capacity
      imageUrl
    }
  }
}
`;

export { ADD_ROOM_TO_CREST as default };
