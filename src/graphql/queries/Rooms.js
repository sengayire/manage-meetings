import gql from 'graphql-tag';

export const GET_ROOMS_QUERY = gql`
  query rooms(
    $capacity: Int
    $location: String!
    $office: String!
    $page: Int!
    $perPage: Int!
  ) {
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
      pages
      queryTotal
      hasNext
      hasPrevious
    }
  }`;

export const GET_ALL_ROOMS_QUERY = gql`
  query rooms(
    $capacity: Int!
    $location: String!
    $office: String!
    $page: Int!
    $perPage: Int!
  ) {
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
      }
    }
  }`;

export const GET_ALL_ROOMS = gql`
  {
    allRooms {
      rooms {
        id
        name
        capacity
      }
    }
  }`;

const GET_LOCATIONS_QUERY = gql`
  query locations {
    allLocations {
      id
      name
    }
  }`;

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
  }`;

const GET_ALL_REMOTE_ROOMS = gql`
  query {
    allRemoteRooms {
      rooms {
        calendarId
        name
      }
    }
}`;

export { GET_ROOMS_QUERY as default, GET_LOCATIONS_QUERY, GET_ROOM_BY_NAME, GET_ALL_REMOTE_ROOMS };
