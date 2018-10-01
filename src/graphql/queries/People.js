import gql from 'graphql-tag';

export const GET_PEOPLE_QUERY = gql`
query allUsers ($page: Int!, $perPage: Int!) {
  users(page: $page , perPage: $perPage){
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

const GET_ROLES_QUERY = gql`
query roles {
  roles {
    id
    role
  }
}`;
export { GET_PEOPLE_QUERY as default, GET_ROLES_QUERY };
