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

export { ADD_CENTER_MUTATION as default };
