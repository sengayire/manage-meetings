import gql from 'graphql-tag';

export const ADD_RESOURCE_MUTATION = gql`
mutation createResource($name: String!) {
    createResource(name: $name) {
    resource {
      id
      name
    }
  }
}
`;

export { ADD_RESOURCE_MUTATION as default };
