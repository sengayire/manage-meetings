import gql from 'graphql-tag';

export const GET_ROOMS_QUERY = gql`
query rooms {
  allRooms (page:1, perPage:5){
    rooms{
      name
      id
      floor{
        block{
          offices{
            name
            location{
              name
              id
            }
          }
        }
      }
    }
    pages
    hasNext
    hasPrevious
  }
}`;

const GET_LOCATIONS_QUERY = gql`
query locations {
  allLocations {
    id
    name
  }
}`;

export { GET_ROOMS_QUERY as default, GET_LOCATIONS_QUERY };
