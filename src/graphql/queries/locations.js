import gql from 'graphql-tag';

export const GET_NAIROBI_QUERY = gql`
query{
    getOfficeByName(name:"St. catherines"){
      id
      name
      location{
        id
        name
      }
      blocks{
        id
        name
        floors{
          id
          name
        }
      }
    }
  }
`;

export { GET_NAIROBI_QUERY as default };
