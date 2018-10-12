import gql from 'graphql-tag';

export const GET_ROOMS_QUERY = gql`
query rooms($capacity: Int!, $location: String!, $office: String, !$page: Int!, $perPage: Int!) {
  allRooms (page: $page, perPage: $perPage, capacity: $capacity, location: $location, office: $office){
    rooms{
      id
      name
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
    queryTotal
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
