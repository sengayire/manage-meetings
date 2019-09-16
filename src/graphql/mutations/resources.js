import gql from 'graphql-tag';
import { resourceFR, resourcesFR } from '../queries/Fragments';

export const EDIT_RESOURCE_MUTATION = gql`
  mutation updateRoomResource(
    $resourceId: Int!
    $name: String!
  ) {
    updateRoomResource(resourceId: $resourceId, name: $name) {
      resource {
        ...resource
      }
    }
  }
${resourceFR}`;

export const DELETE_RESOURCE_MUTATION = gql`
  mutation deleteResource($resourceId: Int!) {
    deleteResource(resourceId: $resourceId) {
      resource {
        ...resource
      }
    }
  }
${resourceFR}`;

export const ASSIGN_RESOURCE_MUTATION = gql`
  mutation assignResource(
    $resourceId: Int!
    $quantity: Int!
    $roomId: Int!
  ) {
    assignResource(resourceId: $resourceId, quantity: $quantity, roomId: $roomId) {
      roomResource {
          ...resources
        resource {
          ...resource
          room {
            roomId
            room {
              name
            }
          }
        }
      }
    }
  }
${resourceFR}
${resourcesFR}`;

export { EDIT_RESOURCE_MUTATION as default };
