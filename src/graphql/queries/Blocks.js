import gql from 'graphql-tag';

const GET_ALL_BLOCKS = gql`
  query allBlocks {
    allBlocks{
      id,
      name,
      offices{
        id,
        name
        location{
          name
        }
      }
    }
  }
`;

export default GET_ALL_BLOCKS;
