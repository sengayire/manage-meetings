import apolloClient from '../../../utils/ApolloClient';
import { ADD_LEVEL_SETUP_MUTATION, DELETE_OFFICE_STRUCTURE } from '../../../graphql/mutations/Preview';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';

const addLevelSetup = async ({ flattenedData }, client = apolloClient) => {
  await client.mutate({
    mutation: ADD_LEVEL_SETUP_MUTATION,
    name: 'preview',
    variables: {
      flattenedData,
    },
    update: async (store) => {
      // Read the data from our cache for this query.
      const data = store.readQuery({ query: GET_ALL_LEVELS });
      data.allStructures = [...data.allStructures, flattenedData];
      store.writeQuery({
        query: GET_ALL_LEVELS,
        data,
      });
    },
  });
};

export const deleteOfficeStructure = async (structureIds, client = apolloClient) => {
  let data;
  await client.mutate({
    mutation: DELETE_OFFICE_STRUCTURE,
    name: 'delete_office_structure',
    variables: {
      structureIds,
    },
    refetchQueries: [{ query: GET_ALL_LEVELS }],
    update: async (store) => {
      data = store.readQuery({ query: GET_ALL_LEVELS });
      data.allStructures = [...data.allStructures];
      data.allStructures = data.allStructures.filter(structure => structure.state === 'active');
      store.writeQuery({
        query: GET_ALL_LEVELS,
        data,
      });
    },
  });
  return data;
};

export default addLevelSetup;
