import gql from 'graphql-tag';

const EDIT_ROOM_DETAILS_MUTATION = gql`
   mutation updateRoom($roomId: Int!, $name: String!){
       updateRoom(roomId: $roomId,  name: $name){
               room{
                   name
               }
           }
       }`;

const DELETE_ROOM = gql`
  mutation DeleteRoom($roomId: Int!) {
   deleteRoom(roomId: $roomId) {
     room {
       id
       name
       }
     }
   }`;

export { EDIT_ROOM_DETAILS_MUTATION, DELETE_ROOM };
