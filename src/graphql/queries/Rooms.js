import gql from 'graphql-tag';
import { paginationFR, someRoomFR, roomFR, idNameFR } from './Fragments';

const remoteRoomFR = gql`
fragment remoteRoomFields on AllRemoteRooms {
  rooms {
    calendarId
    name
  }
}
`;

const roomDevicesFR = gql`
fragment roomDevices on Room {
  devices{
    ...idNameDevices
  }
}
${idNameFR('Devices')}`;

export const GET_ROOMS_QUERY = gql`
  query rooms($capacity: Int, $location: String!, $office: String!, $page: Int!, $perPage: Int!, $roomLabels: String) {
    allRooms(
      page: $page
      perPage: $perPage
      capacity: $capacity
      location: $location
      office: $office
      roomLabels: $roomLabels
    ) {
      rooms {
        ...roomFields
        ...roomDevices
      }
      ...pagination
    }
  }
${roomFR}
${roomDevicesFR}
${paginationFR('PaginatedRooms')}
`;

export const GET_ALL_ROOMS_QUERY = gql`
  query rooms($capacity: Int!, $location: String!, $office: String!, $page: Int, $perPage: Int) {
    allRooms(
      page: $page
      perPage: $perPage
      capacity: $capacity
      location: $location
      office: $office
    ) {
      rooms {
        ...roomFields
      }
    }
  }
${roomFR}
`;

export const GET_ALL_ROOMS = gql`
  query rooms($location: String){
    allRooms(location: $location) {
      rooms {
        ...roomFields
        ...roomDevices
      }
    }
  }
${roomFR}
${roomDevicesFR}`;

const GET_LOCATIONS_QUERY = gql`
  query locations {
    allLocations {
      ...idNameLocation
    }
  }
${idNameFR('Location')}`;

const GET_ROOM_BY_NAME = gql`
  query roomByName($name: String!) {
    getRoomByName(name: $name) {
      ...someRoomFields
      floor {
        block {
          offices {
            name
            location {
              ...idNameLocation
            }
          }
        }
      }
    }
  }
${someRoomFR}
${idNameFR('Location')}`;

const GET_ROOM = gql`
  query roomById($Id: Int) {
    getRoomById(roomId: $Id) {
      ...someRoomFields
      locationId
      roomLabels
      imageUrl
    }
  }
${someRoomFR}`;

const GET_ALL_REMOTE_ROOMS = gql`
  query {
    allRemoteRooms {
      ...remoteRoomFields
    }
  }
${remoteRoomFR}`;

const GET_REMOTE_ROOMS_ALL_LOCATIONS = gql`
  query allRooms($returnAll: Boolean) {
    allRemoteRooms(returnAll: $returnAll) {
      ...remoteRoomFields
    }
  }
${remoteRoomFR}`;

export {
  GET_ROOMS_QUERY as default,
  GET_LOCATIONS_QUERY,
  GET_ROOM_BY_NAME,
  GET_ALL_REMOTE_ROOMS,
  GET_REMOTE_ROOMS_ALL_LOCATIONS,
  GET_ROOM,
};
