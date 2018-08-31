import gql from 'graphql-tag';

export const GET_PEOPLE_QUERY = gql`
query allUsers{
  users(page: 1, perPage:10){
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

export { GET_PEOPLE_QUERY as default };
