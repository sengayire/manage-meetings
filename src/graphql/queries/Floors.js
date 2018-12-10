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

export { GET_FLOORS_QUERY as default };
