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

const GET_ALL_LOCATIONS = gql`
query{
  allLocations {
    id
    name
    country
    abbreviation
    imageUrl
  }
 }
`;

export { GET_NAIROBI_QUERY as default, GET_ALL_LOCATIONS };
