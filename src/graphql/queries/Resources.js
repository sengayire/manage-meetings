import gql from 'graphql-tag';
import { paginationFR, idNameFR } from './Fragments';

export const GET_RESOURCES_QUERY = gql`
  query resources($page: Int!, $perPage: Int!) {
    allResources(page: $page, perPage: $perPage) {
      resources {
        ...idNameResource
        room {
          roomId
          room {
            name
          }
        }
      }
    ...pagination
    }
  }
${idNameFR('Resource')}
${paginationFR('PaginatedResource')}`;

export const GET_ROOM_RESOURCES = gql`
  query singleRoomResources($roomId: Int!) {
    getResourcesByRoomId(roomId: $roomId) {
      roomResources {
        room {
          quantity
          resource {
            name
            room {
              name
            }
          }
        }
      }
    }
  }
`;

export { GET_RESOURCES_QUERY as default };
