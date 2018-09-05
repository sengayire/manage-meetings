import gql from 'graphql-tag';

const ADD_OFFICE_MUTATION = gql`
  mutation createOffice($locationId: Int!, $name: String!) {
    createOffice(locationId: $locationId, name: $name){
      office{
        id
        name
      }
    }
  }
`;

export { ADD_OFFICE_MUTATION as default };
