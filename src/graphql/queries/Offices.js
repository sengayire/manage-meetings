import gql from 'graphql-tag';

const blockFloorsFR = gql`
fragment blockFloors on Office {
    id
    name
    floors {
        id
        name
    }
}
`;

const officeFR = gql`
fragment office on Office {
  hasNext
  hasPrevious
  pages
  queryTotal
}
`;

const officeLocationFR = gql`
fragment officeLocation on Office {
  id
  name
  location {
    name
    timeZone
  }
}
`;

const GET_EPIC_TOWER_DETAILS_QUERY = gql`
query officeDetails {
 getOfficeByName(name: "EPIC Tower"){
  id
  blocks {
    id
    name
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
}
`;

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
      ...blockFloors
    }
  }
}
${blockFloorsFR}`;

const GET_CREST_DETAILS = gql`
query officeDetails {
 getOfficeByName(name: "The Crest"){
  id
  blocks {
    ...blockFloors
  }
}
}
${blockFloorsFR}`;

const GET_ALL_OFFICES = gql`
  query allOffices($page: Int!, $perPage: Int!) {
    allOffices(page: $page, perPage: $perPage) {
      offices {
        ...officeLocation
      }
      ...office
    }
  }
  ${officeLocationFR}
  ${officeFR}
`;

const GET_ALL_OFFICES_QUERY = gql`
  query allOffices($page: Int!, $perPage: Int!) {
    allOffices(page: $page, perPage: $perPage) {
      offices {
        ...officeLocation
        blocks{
          name
          id
        }
      }
      ...office
    }
  }
  ${officeLocationFR}
  ${officeFR}
`;

export {
  GET_EPIC_TOWER_DETAILS_QUERY as default,
  GET_NAIROBI_DETAILS,
  GET_CREST_DETAILS,
  GET_ALL_OFFICES,
  GET_ALL_OFFICES_QUERY,
};
