import gql from 'graphql-tag';
import { roomFR, idNameFR } from '../queries/Fragments';

const EDIT_ROOM_DETAILS_MUTATION = gql`
  mutation updateRoom($roomId: Int!, $name: String!){
    updateRoom(roomId: $roomId,  name: $name){
      room{
        ...idNameRoom
      }
    }
  }
${idNameFR('Room')}`;

const DELETE_ROOM = gql`
  mutation DeleteRoom($roomId: Int!) {
    deleteRoom(roomId: $roomId) {
      room {
        ...idNameRoom
      }
    }
  }
${idNameFR('Room')}`;

const ADD_ROOM = gql`
  mutation AddRoom($name: String!, $roomType: String!, $capacity: Int!, $imageUrl: String!, $locationId: Int!, $calendarId: String!, $structureId: String!,
    $roomLabels: [String]){
    createRoom(name: $name, roomType: $roomType, capacity: $capacity, imageUrl: $imageUrl, locationId: $locationId, calendarId: $calendarId, structureId: $structureId
      roomLabels: $roomLabels){
        room {
          ...roomFields
        }
    }
  }
${roomFR}`;

export { EDIT_ROOM_DETAILS_MUTATION, DELETE_ROOM, ADD_ROOM };
