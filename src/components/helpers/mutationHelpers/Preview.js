import apolloClient from '../../../utils/ApolloClient';
import { ADD_LEVEL_SETUP_MUTATION } from '../../../graphql/mutations/Preview';


const addLevelSetup = async ({ flattenedData }, client = apolloClient) => {
  await client.mutate({
    mutation: ADD_LEVEL_SETUP_MUTATION,
    name: 'preview',
    variables: {
      flattenedData,
    },
  });
};

export default addLevelSetup;
