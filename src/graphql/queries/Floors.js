import gql from 'graphql-tag';

const GET_FLOORS_QUERY = gql`
  {
    allFloors {
      id
      name
      blockId
      block {
        id
        name
        offices {
          name
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
    }
  }
`;
export { GET_FLOORS_QUERY as default };
