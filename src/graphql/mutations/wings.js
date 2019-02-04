import gql from 'graphql-tag';

const ADD_WING_MUTATION = gql`
  mutation createWing($name: String!, $floorId: Int!) {
    createWing(name: $name, floorId: $floorId) {
      wing {
        name
        floorId
      }
    }
  }
`;

const DELETE_WING_MUTATION = gql`
  mutation deleteWing($wingId: Int!) {
    deleteWing(wingId: $wingId) {
      wing {
        id
        name
      }
    }
  }
`;

const EDIT_WING_MUTATION = gql`
  mutation updateWing( $name: String!, $wingId: Int!) {
    updateWing( name: $name, wingId: $wingId) {
      wing {
        id
        name
      }
    }
  }
`;

export {
  ADD_WING_MUTATION as default,
  DELETE_WING_MUTATION,
  EDIT_WING_MUTATION,
};
