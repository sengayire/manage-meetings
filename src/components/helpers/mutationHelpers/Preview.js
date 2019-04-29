import apolloClient from '../../../utils/ApolloClient';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';
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

export default addLevelSetup;
