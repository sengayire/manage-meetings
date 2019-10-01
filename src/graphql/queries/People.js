import gql from 'graphql-tag';

export const GET_PEOPLE_QUERY = gql`
query allUsers ($page: Int!, $perPage: Int!, $locationId: Int, $roleId: Int) {
  users(page: $page , perPage: $perPage, locationId: $locationId, roleId: $roleId){
    users{
      email
      name
      picture
      location
      id
      roles{
        role
        id
      }
    }
    pages
    hasNext
    hasPrevious
    queryTotal
  }
}
`;

const GET_USER_QUERY = gql`
query user ($email: String!) {
  user( email: $email) {
    id
    location
    roles{
      id
      role
    }
  }
 }
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
    id
    role
  }
}`;

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
