import gql from 'graphql-tag';

const GET_FLOORS_QUERY = gql`
  query allFloors($page: Int!, $perPage:Int!){
    allFloors(page: $page, perPage:$perPage) {
      floors{
        name
        id
        blockId
        block{
          name
          id
          offices{
            name
            location {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_PAGINATED_FLOORS_QUERY = gql`
  query allFloors($page: Int!, $perPage:Int!){
    allFloors(page:$page, perPage:$perPage){
      floors{
        id
        name
        blockId
        block{
          name
          id
          offices{
            id
          }
        }
      }
      hasNext
      hasPrevious
      pages
    }
  }
`;
export { GET_FLOORS_QUERY as default };
