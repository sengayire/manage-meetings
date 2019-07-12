/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { INVITE_PERSON_MUTATION } from '../../../graphql/mutations/People';

const invitePersonMutation = async (email, client = apolloClient) => {
  await client
    .mutate({
      mutation: INVITE_PERSON_MUTATION,
      name: 'invitePersonMutation',
      variables: { email },
    });
};

export { invitePersonMutation };
