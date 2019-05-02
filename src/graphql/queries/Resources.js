import gql from 'graphql-tag';

export const GET_RESOURCES_QUERY = gql`
  query resources($page: Int!, $perPage: Int!) {
    allResources(page: $page, perPage: $perPage) {
      resources {
        id
        name
        quantity
      }
      pages
      hasNext
      hasPrevious
      queryTotal
    }
  }
`;

export const GET_ROOM_RESOURCES = gql`
  query singleRoomResources($roomId: Int!) {
    getResourcesByRoomId(roomId: $roomId) {
      name
    }
  }
`;

export { GET_RESOURCES_QUERY as default };
