import gql from 'graphql-tag';
import { idNameFR } from '../../queries/Fragments';

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
        ...idNameRoom
        capacity
        roomType
        roomLabels
        imageUrl
      }
    }
  }
${idNameFR('Room')}`;

export default UPDATE_ROOM;
