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

export { GET_EPIC_TOWER_DETAILS_QUERY as default, GET_CREST_DETAILS };
