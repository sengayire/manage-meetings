import gql from 'graphql-tag';

export const GET_PEOPLE_QUERY = gql`
query allUsers{
  users(page: 1, perPage:5){
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
