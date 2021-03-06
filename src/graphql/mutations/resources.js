import gql from 'graphql-tag';

export const EDIT_RESOURCE_MUTATION = gql`
  mutation updateRoomResource(
    $resourceId: Int!
    $name: String!
  ) {
    updateRoomResource(resourceId: $resourceId, name: $name) {
      resource {
        id
        name
      }
    }
  }
`;

export const DELETE_RESOURCE_MUTATION = gql`
  mutation deleteResource($resourceId: Int!) {
    deleteResource(resourceId: $resourceId) {
      resource {
        id
        name
      }
    }
  }
`;

export const ASSIGN_RESOURCE_MUTATION = gql`
  mutation assignResource(
    $resourceId: Int!
    $quantity: Int!
    $roomId: Int!
  ) {
    assignResource(resourceId: $resourceId, quantity: $quantity, roomId: $roomId) {
      roomResource {
        roomId
        resourceId
        quantity
        name
        resource {
          id
          name
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
`;

export { EDIT_RESOURCE_MUTATION as default };
