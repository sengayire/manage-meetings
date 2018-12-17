import gql from 'graphql-tag';

export const GET_ALL_WINGS = gql`
 {
    allWings{
      id
      name
      floorId
      floor{
        id
        name
        blockId
        block{
          id
          name
        }
      }
      rooms{
        id
        name
        roomType
        capacity
      }
    }
  }
 `;

export default GET_ALL_WINGS;

