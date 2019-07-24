/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { INVITE_PERSON_MUTATION, CHANGE_USER_LOCATION_MUTATION } from '../../../graphql/mutations/People';
import { decodeTokenAndGetUserData } from '../../../utils/Cookie';

const invitePersonMutation = async (email, client = apolloClient) => {
  await client
    .mutate({
      mutation: INVITE_PERSON_MUTATION,
      name: 'invitePersonMutation',
      variables: { email },
    });
};

const changeUserLocation = async (locationId, client = apolloClient) => {
  const { UserInfo: { email } } = decodeTokenAndGetUserData();

  await client
    .mutate({
      mutation: CHANGE_USER_LOCATION_MUTATION,
      name: 'changeUserLocation',
      variables: { email, locationId },
    });
};

export { invitePersonMutation, changeUserLocation };
