import gql from 'graphql-tag';

const EDIT_FLOOR_MUTATION = gql`
  mutation updateFloor($name: String!, $floorId: Int!) {
    updateFloor(name: $name, floorId: $floorId) {
      floor {
        id
        name
      }
    }
  }
`;

const DELETE_FLOOR_MUTATION = gql`
  mutation deleteFloor($floorId: Int!) {
    deleteFloor(floorId: $floorId) {
      floor {
        name
      }
    }
  }
`;
const ADD_FLOOR_MUTATION = gql`
  mutation createFloor($name: String!, $blockId: Int!) {
    createFloor(name: $name, blockId: $blockId) {
      floor {
        id
        name
      }
    }
  }
`;
export { EDIT_FLOOR_MUTATION, DELETE_FLOOR_MUTATION, ADD_FLOOR_MUTATION };
