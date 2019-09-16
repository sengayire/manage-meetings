import gql from 'graphql-tag';

const structureFR = gql`
fragment structure on Structure {
  structureId
  name
  level
  parentId
  parentTitle
  tag
  position
  locationId
}`;

export const ADD_LEVEL_SETUP_MUTATION = gql`
mutation createOfficeStructure($flattenedData: [StructureInputs]!){
  createOfficeStructure(data: $flattenedData){
    structure{
      ...structure
    }
  }
}
${structureFR}`;

export const DELETE_OFFICE_STRUCTURE = gql`
  mutation deleteOfficeStructure($structureIds: [String]!){
    deleteOfficeStructure(structureIds: $structureIds){
      structure{
        ...structure
      }
    }
  }
${structureFR}`;

export { ADD_LEVEL_SETUP_MUTATION as default };
