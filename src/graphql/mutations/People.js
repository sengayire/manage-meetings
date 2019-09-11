import gql from 'graphql-tag';
import { idNameFR } from '../queries/Fragments';

const UPDATE_ROLES_MUTATION = gql`
  mutation changeUserRole($email: String!, $roleId: Int!) {
    changeUserRole(email: $email, roleId: $roleId){
      user{
        ...idNameUser
        email
        roles{
          id
          role
        }
      }
    }
  }
${idNameFR('User')}`;

const INVITE_PERSON_MUTATION = gql`
mutation inviteToConverge($email: String!) {
  inviteToConverge(email: $email) {
    email
  }
}
`;

const CHANGE_USER_LOCATION_MUTATION = gql`
  mutation changeUserLocation($email: String!, $locationId: Int!) {
    changeUserLocation(email: $email, locationId: $locationId) {
      user {
        name
        location
      }
    }
  }
`;

export {
  UPDATE_ROLES_MUTATION as default,
  INVITE_PERSON_MUTATION,
  CHANGE_USER_LOCATION_MUTATION,
};
