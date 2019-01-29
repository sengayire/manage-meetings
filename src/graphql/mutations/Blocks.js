import gql from 'graphql-tag';

const ADD_BLOCK_MUTATION = gql`
  mutation createBlock($officeId: Int!, $name: String!) {
    createBlock(officeId: $officeId, name: $name) {
      block {
        name
      }
    }
  }
`;

const DELETE_BLOCK_MUTATION = gql`
  mutation DeleteBlock($blockId: Int!) {
    DeleteBlock(blockId: $blockId) {
      block {
        id
        name
      }
    }
  }
`;

const EDIT_BLOCK_MUTATION = gql`
  mutation updateBlock($blockId: Int!, $name: String!) {
    updateBlock(blockId: $blockId, name: $name) {
      block {
        id
        name
      }
    }
  }
`;

export {
  ADD_BLOCK_MUTATION as default,
  DELETE_BLOCK_MUTATION,
  EDIT_BLOCK_MUTATION,
};
