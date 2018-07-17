import gql from 'graphql-tag';

export const GET_ROOMS_QUERY = gql`
  query rooms {
    allRooms {
      id
      name
      floor {
        block {
          name
          location {
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
}`;

export { GET_ROOMS_QUERY as default, GET_LOCATIONS_QUERY };
