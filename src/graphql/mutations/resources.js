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

export { EDIT_RESOURCE_MUTATION as default };
