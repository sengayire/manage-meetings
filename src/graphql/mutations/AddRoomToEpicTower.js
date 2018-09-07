import gql from 'graphql-tag';

export const ADD_ROOM_TO_EPIC_TOWER = gql`
mutation CreateRoom($roomType: String!, $roomWingId: Int, $roomName: String!, $roomFloorId: Int!, $roomCapacity: Int!, $roomCalendar: String!, $office_id: Int!, $roomImageUrl: String) {
  createRoom(roomType: $roomType, wingId: $roomWingId, name: $roomName, floorId: $roomFloorId, capacity: $roomCapacity, calendarId: $roomCalendar, imageUrl: $roomImageUrl, officeId: $office_id) {
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

export { ADD_ROOM_TO_EPIC_TOWER as default };
