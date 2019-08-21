import gql from 'graphql-tag';

const UPDATE_ROLES_MUTATION = gql`
  mutation changeUserRole($email: String!, $roleId: Int!) {
    changeUserRole(email: $email, roleId: $roleId){
      user{
        id
        email
        name
        roles{
          id
          role
        }
      }
    }
  }
`;

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

const SET_USER_LOCATION = gql`
mutation setUserLocation($locationId: Int!) {
  setUserLocation(locationId: $locationId) {
    user {
      email
      location
    }
  }
}
`;

export {
  UPDATE_ROLES_MUTATION as default,
  INVITE_PERSON_MUTATION,
  CHANGE_USER_LOCATION_MUTATION,
  SET_USER_LOCATION,
};
