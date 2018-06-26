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
            name
          }
        }
      }
    }
  }
`;

export { GET_ROOMS_QUERY as default };
