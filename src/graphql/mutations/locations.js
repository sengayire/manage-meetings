import gql from 'graphql-tag';

const ADD_LOCATION_MUTATION = gql`
  mutation createLocation($imageUrl: String, $name: String!, $timeZone:String!, $country: String!, $abbreviation: String! ) {
    createLocation(imageUrl: $imageUrl, name: $name, timeZone: $timeZone, country: $country, abbreviation: $abbreviation) {
      location {
        id
        name
      }
    }
  }
`;

export { ADD_LOCATION_MUTATION as default };
