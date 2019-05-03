import gql from 'graphql-tag';

const GET_ALL_LEVELS = gql`
query {
    allStructures {
        name
        tag
        locationId
        parentId
        parentTitle
        level
        position
        structureId
    }
}`;
export { GET_ALL_LEVELS as default };
