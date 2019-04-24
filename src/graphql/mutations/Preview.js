import gql from 'graphql-tag';

export const ADD_LEVEL_SETUP_MUTATION = gql`
mutation createOfficeStructure($flattenedData: [StructureInputs]!){
  createOfficeStructure(data: $flattenedData){
    structure{
      structureId
      name
      level
      parentId
      parentTitle
      tag
      position
      locationId
    }
  }
}
`;

export { ADD_LEVEL_SETUP_MUTATION as default };
