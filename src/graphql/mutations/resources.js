import gql from 'graphql-tag';

export const EDIT_RESOURCE_MUTATION = gql`
mutation updateRoomResource($resourceId: Int!,$name:String!,$roomId:Int!){
    updateRoomResource(resourceId: $resourceId,name:$name,roomId:$roomId){
      resource {
      name
    }
  }
}
`;

export const DELETE_RESOURCE_MUTATION = gql`
  mutation deleteResource($resourceId: Int!) {
    deleteResource(resourceId: $resourceId) {
      resource {
        roomId
        id
        name
      }
    }
  }
`;

export { EDIT_RESOURCE_MUTATION as default };
