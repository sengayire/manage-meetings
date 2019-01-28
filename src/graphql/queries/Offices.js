import gql from 'graphql-tag';

const GET_EPIC_TOWER_DETAILS_QUERY = gql`
query officeDetails {
 getOfficeByName(name: "EPIC Tower"){
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

const GET_NAIROBI_DETAILS = gql`
query officeDetails {
  getOfficeByName(name:"St Catherines"){
      id
      name
      location{
        id
        name
      }
      blocks{
        id
        name
        floors{
          id
          name
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
  query allOffices($page: Int!, $perPage: Int!) {
    allOffices(page: $page, perPage: $perPage) {
      offices {
        id
        name
        location {
          name
          timeZone
        }
      }
      hasNext
      hasPrevious
      pages
      queryTotal
    }
  }
`;

const GET_ALL_OFFICES_QUERY = gql`
  query allOffices($page: Int!, $perPage: Int!) {
    allOffices(page: $page, perPage: $perPage) {
      offices {
        id
        name
        location {
          name
          timeZone
        }
        blocks{
          name
          id
        }
      }
      hasNext
      hasPrevious
      pages
      queryTotal
    }
  }
`;

export {
  GET_EPIC_TOWER_DETAILS_QUERY as default,
  GET_NAIROBI_DETAILS,
  GET_CREST_DETAILS,
  GET_ALL_OFFICES,
  GET_ALL_OFFICES_QUERY,
};
