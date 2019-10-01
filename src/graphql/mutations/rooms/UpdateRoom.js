import gql from 'graphql-tag';

const UPDATE_ROOM = gql`
  mutation UpdateRoom(
    $roomId: Int!
    $roomName: String
    $roomCapacity: Int
    $roomType: String
    $imageUrl: String
    $roomLabels: [String]
    $structureId: String!
  ) {
    updateRoom(
      roomId: $roomId
      name: $roomName
      capacity: $roomCapacity
      roomType: $roomType
      imageUrl: $imageUrl
      roomLabels: $roomLabels
      structureId: $structureId
    ) {
      room {
        id
        name
        capacity
        roomType
        roomLabels
        imageUrl
      }
    }
  }
`;

export default UPDATE_ROOM;
