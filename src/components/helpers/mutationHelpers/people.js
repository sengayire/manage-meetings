/* eslint-disable import/prefer-default-export */
import apolloClient from '../../../utils/ApolloClient';
import { INVITE_PERSON_MUTATION, CHANGE_USER_LOCATION_MUTATION, SET_USER_LOCATION } from '../../../graphql/mutations/People';
import { decodeTokenAndGetUserData } from '../../../utils/Cookie';
import { GET_USER_QUERY } from '../../../graphql/queries/People';
import GET_ALL_LEVELS from '../../../graphql/queries/Levels';
import { GET_DEVICES_QUERY } from '../../../graphql/queries/Devices';

require('@babel/polyfill');

const invitePersonMutation = async (email, client = apolloClient) => {
  await client
    .mutate({
      mutation: INVITE_PERSON_MUTATION,
      name: 'invitePersonMutation',
      variables: { email },
    });
};

const changeUserLocation = async (locationId, queryEmail, client = apolloClient) => {
  const { UserInfo: { email: tokenEmail } } = decodeTokenAndGetUserData();
  const email = queryEmail || tokenEmail;

  const { data } = await client
    .mutate({
      mutation: CHANGE_USER_LOCATION_MUTATION,
      name: 'changeUserLocation',
      variables: { email, locationId },
      refetchQueries: [
        { query: GET_USER_QUERY, variables: { email } },
        { query: GET_ALL_LEVELS },
        { query: GET_DEVICES_QUERY },
      ],
    });

  return data;
};

const setNewUsersLocation = async (locationId, client = apolloClient) => {
  await client
    .mutate({
      mutation: SET_USER_LOCATION,
      name: 'setNewUserLocation',
      variables: { locationId },
    });
};

export { invitePersonMutation, changeUserLocation, setNewUsersLocation };
