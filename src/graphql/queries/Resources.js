import gql from 'graphql-tag';

export const GET_RESOURCES_QUERY = gql`
  query resources {
    allResources {
      id
      name
      quantity
      roomId
      room {
        id
        name
      }
    }
  }
`;

export { GET_RESOURCES_QUERY as default };
