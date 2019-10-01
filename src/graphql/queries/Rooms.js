import gql from 'graphql-tag';

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
        id
        name
        roomType
        capacity
        roomLabels
        imageUrl
        calendarId
        locationId
        structureId
        devices{
          id
          name
        }
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
      pages
      queryTotal
      hasNext
      hasPrevious
    }
  }
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
        id
        name
        capacity
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

export const GET_ALL_ROOMS = gql`
  query rooms($location: String){
    allRooms(location: $location) {
      rooms {
        id
        name
        roomType
        capacity
        roomLabels
        imageUrl
        calendarId
        locationId
        structureId
        devices{
          id
          name
        }
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

const GET_LOCATIONS_QUERY = gql`
  query locations {
    allLocations {
      id
      name
    }
  }
`;

const GET_ROOM_BY_NAME = gql`
  query roomByName($name: String!) {
    getRoomByName(name: $name) {
      roomType
      id
      name
      capacity
      floor {
        block {
          offices {
            name
            location {
              name
              id
            }
          }
        }
      }
    }
  }
`;

const GET_ROOM = gql`
  query roomById($Id: Int) {
    getRoomById(roomId: $Id) {
      name
      capacity
      locationId
      roomLabels
      roomType
      imageUrl
    }
  }
`;
const GET_ALL_REMOTE_ROOMS = gql`
  query {
    allRemoteRooms {
      rooms {
        calendarId
        name
      }
    }
  }
`;

const GET_REMOTE_ROOMS_ALL_LOCATIONS = gql`
  query allRooms($returnAll: Boolean) {
    allRemoteRooms(returnAll: $returnAll) {
      rooms {
        calendarId
        name
      }
    }
  }
`;

export {
  GET_ROOMS_QUERY as default,
  GET_LOCATIONS_QUERY,
  GET_ROOM_BY_NAME,
  GET_ALL_REMOTE_ROOMS,
  GET_REMOTE_ROOMS_ALL_LOCATIONS,
  GET_ROOM,
};
