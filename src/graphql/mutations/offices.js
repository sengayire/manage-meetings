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

const DELETE_OFFICE_MUTATION = gql`
  mutation deleteOffice($officeId: Int!){
    deleteOffice(officeId: $officeId){
      office{
        id
        name
      }
    }
  }
`;
export { ADD_OFFICE_MUTATION as default, DELETE_OFFICE_MUTATION };
