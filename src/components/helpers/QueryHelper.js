import { GET_USER_QUERY } from '../../graphql/queries/People';
import { decodeTokenAndGetUserData } from '../../utils/Cookie';

/**
 * Gets the user details from the cache if present in the cache else it
 * sends a query to the backend.
 *
 * @param {Object} client - Apollo-client instance
 *
 * @returns {Object} - An object containing the user details
 */
const getUserDetails = async (client) => {
  const { UserInfo: userData } = decodeTokenAndGetUserData() || {};
  const email = process.env.NODE_ENV === 'test' ? 'sammy.muriuki@andela.com' : userData.email;
  try {
    const data = await client.readQuery({
      query: GET_USER_QUERY,
      variables: {
        email,
      },
    }, true);
    return data.user;
  } catch (err) {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { email },
    });
    return data.user;
  }
};

export default getUserDetails;
