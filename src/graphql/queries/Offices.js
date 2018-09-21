import gql from 'graphql-tag';

const GET_EPIC_TOWER_DETAILS_QUERY = gql`
query officeDetails {
 getOfficeByName(name: "Epic tower"){
  id
  blocks {
    id
    floors {
      id
      name
      wings{
        id
        name
      }
    }
  }
}
}`;


const GET_CREST_DETAILS = gql`
query officeDetails {
 getOfficeByName(name: "The Crest"){
  id
  blocks {
    id
    floors {
      id
      name
    }
  }
}
}`;

const GET_ALL_OFFICES = gql`
  query allOffices {
    allOffices(page: 1, perPage: 5){
      offices{
        id,
        name,
        location{
          name,
          timeZone
        }
      }
    }
  }
`;

export {
  GET_EPIC_TOWER_DETAILS_QUERY as default,
  GET_CREST_DETAILS,
  GET_ALL_OFFICES,
};
