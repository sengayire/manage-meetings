import gql from 'graphql-tag';
import { idNameFR } from '../queries/Fragments';

export const ADD_RESOURCE_MUTATION = gql`
mutation createResource($name: String!) {
    createResource(name: $name) {
    resource {
      ...idNameResource
    }
  }
}
${idNameFR('Resource')}`;

export { ADD_RESOURCE_MUTATION as default };
