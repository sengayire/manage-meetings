import gql from 'graphql-tag';

export const ADD_RESOURCE_MUTATION = gql`
mutation CreateRoom($resourceQuantity: Int!, $roomName: String!, $roomId: Int!) {
    createResource(quantity: $resourceQuantity, name: $roomName, roomId: $roomId) {
    resource {
      id
      name
      roomId
    }
  }
}
`;

export { ADD_RESOURCE_MUTATION as default };
