import gql from 'graphql-tag';

const ADD_CENTER_MUTATION = gql`
  mutation createLocation($imageUrl: String, $name: String!, $timeZone:String!, $country: String!, $abbreviation: String! ) {
    createLocation(imageUrl: $imageUrl, name: $name, timeZone: $timeZone, country: $country, abbreviation: $abbreviation) {
      location {
        id
        name
      }
    }
  }
`;

const EDIT_CENTER_MUTATION = gql`
  mutation updateLocation($locationId: Int!, $name: String!, $country: String!, $abbreviation: String!){
    updateLocation(locationId: $locationId, name: $name, country: $country, abbreviation: $abbreviation){ 
        location{
            name
            abbreviation
            country
        }
    }
}
`;

const DELETE_CENTER_MUTATION = gql`
  mutation deleteLocation($locationId: Int!){
    deleteLocation(locationId:$locationId){
        location{
          id
        }
    }
  }
`;
export {
  ADD_CENTER_MUTATION as default,
  EDIT_CENTER_MUTATION,
  DELETE_CENTER_MUTATION,
};
