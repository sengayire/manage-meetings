import gql from 'graphql-tag';

const EDIT_ROOM_DETAILS_MUTATION = gql`
  mutation updateRoom($roomId: Int!, $name: String!) {
    updateRoom(roomId: $roomId, name: $name) {
      room {
        name
      }
    }
  }
`;

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

const ADD_ROOM = gql`
  mutation AddRoom(
    $name: String!
    $roomType: String!
    $capacity: Int!
    $imageUrl: String!
    $locationId: Int!
    $calendarId: String!
    $structureId: String!
    $roomLabels: [String]
  ) {
    createRoom(
      name: $name
      roomType: $roomType
      capacity: $capacity
      imageUrl: $imageUrl
      locationId: $locationId
      calendarId: $calendarId
      structureId: $structureId
      roomLabels: $roomLabels
    ) {
      room {
        id
        name
        roomType
        capacity
        roomLabels
        imageUrl
        calendarId
        locationId
        structureId
        resources {
          roomId
          resourceId
          quantity
          name
          resource {
            id
            name
          }
        }
      }
    }
  }
`;

export { EDIT_ROOM_DETAILS_MUTATION, DELETE_ROOM, ADD_ROOM };
