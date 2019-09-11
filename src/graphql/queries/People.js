import gql from 'graphql-tag';
import { paginationFR, idNameFR } from './Fragments';

const roleFR = gql`
fragment role on Role {
  role
  id
}
`;

export const GET_PEOPLE_QUERY = gql`
query allUsers ($page: Int!, $perPage: Int!, $locationId: Int, $roleId: Int) {
  users(page: $page , perPage: $perPage, locationId: $locationId, roleId: $roleId){
    users{
      ...idNameUser
      email
      picture
      location
      roles{
        ...role
      }
    }
    ...pagination
  }
}
${roleFR}
${idNameFR('User')}
${paginationFR('PaginatedUsers')}
`;

const GET_USER_QUERY = gql`
query user ($email: String!) {
  user( email: $email) {
    id
    location
    roles{
        ...role
    }
  }
 }
${roleFR}
`;

const GET_LOCATION_QUERY = gql`
  query {
    userLocation @client {
      id
      name
    }
  }
`;

const GET_ROLES_QUERY = gql`
query roles {
  roles {
    ...role
  }
}
${roleFR}`;

const GET_ROLE_QUERY = gql`
query {
  userRole @client
}`;

export {
  GET_PEOPLE_QUERY as default,
  GET_ROLE_QUERY,
  GET_ROLES_QUERY,
  GET_USER_QUERY,
  GET_LOCATION_QUERY,
};
