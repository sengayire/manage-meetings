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
  }
}
`;

const GET_USER_ROLE = gql`
query user ($email: String!) {
  user( email: $email){
    roles{
      id
      role
    }
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

export { GET_PEOPLE_QUERY as default, GET_ROLES_QUERY, GET_USER_QUERY, GET_USER_ROLE };
